import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

type PartRecord = {
	part_id: string;
	name: string;
	quantity: number | null;
	num_in_use: number | null;
	alt_ids: string | null;
	image_url: string | null;
};

type TeamPartCheckoutRecord = {
	team_id: string | number;
	part_id: string;
	quantity: number | null;
};

type SerializedPart = {
	part_id: string;
	name: string;
	quantity: number;
	num_in_use: number;
	alt_ids: string[];
	image_url: string | null;
};

type AdminRecord = {
	id: number;
	email: string;
	created_at: string | null;
};

function normalizeAltIds(value: string | null): string[] {
	if (!value) return [];
	return value
		.split(',')
		.map((id) => id.trim())
		.filter(Boolean);
}

function serializePart(part: PartRecord): SerializedPart {
	return {
		part_id: part.part_id,
		name: part.name,
		quantity: part.quantity ?? 0,
		num_in_use: part.num_in_use ?? 0,
		alt_ids: normalizeAltIds(part.alt_ids),
		image_url: part.image_url
	};
}

function normalizeSearchTerm(value: string): string {
	return value.trim().toLowerCase();
}

function partMatchesSearch(part: PartRecord, normalizedSearchTerm: string): boolean {
	if (part.part_id.toLowerCase().includes(normalizedSearchTerm)) return true;

	return normalizeAltIds(part.alt_ids).some((altId) =>
		altId.toLowerCase().includes(normalizedSearchTerm)
	);
}

function partMatchesSearchByName(part: PartRecord, normalizedSearchTerm: string): boolean {
	return part.name.toLowerCase().includes(normalizedSearchTerm);
}

async function findPartMatchesBySearchTerm(event: import('@sveltejs/kit').RequestEvent, rawPartId: string) {
	const partId = rawPartId.trim();
	if (!partId) return [];

	const { data: parts, error } = await event.locals.sb
		.from('parts_2026')
		.select('part_id, name, quantity, num_in_use, alt_ids, image_url')
		.returns<PartRecord[]>();

	if (error) {
		console.error('Admin find part matches error:', error);
		return [];
	}

	const normalizedSearchTerm = normalizeSearchTerm(partId);
	const exactMatches = (parts ?? []).filter((part: PartRecord) => {
		if (part.part_id.toLowerCase() === normalizedSearchTerm) return true;
		return normalizeAltIds(part.alt_ids).some((altId) => altId.toLowerCase() === normalizedSearchTerm);
	});

	if (exactMatches.length > 0) {
		return exactMatches;
	}

	return (parts ?? []).filter(
		(part: PartRecord) => partMatchesSearch(part, normalizedSearchTerm) || partMatchesSearchByName(part, normalizedSearchTerm)
	);
}

async function resolveCheckoutTeamId(
	event: import('@sveltejs/kit').RequestEvent,
	rawTeamSelection: string
): Promise<string | number | null> {
	const selection = rawTeamSelection.trim();
	if (!selection) return null;

	const numericId = Number.parseInt(selection, 10);
	const lookupValue = Number.isNaN(numericId) ? selection : numericId;

	const { data: teamRow, error } = await event.locals.sb
		.from('teams_2026')
		.select('id')
		.eq('id', lookupValue)
		.maybeSingle<{ id: string | number }>();

	if (error) {
		console.error('Admin resolve team id error:', error);
		return null;
	}

	if (!teamRow) return null;
	return teamRow.id;
}

async function findPartByAnyId(event: import('@sveltejs/kit').RequestEvent, rawPartId: string) {
	const partId = rawPartId.trim();
	if (!partId) return null;

	const { data: directPart, error: directPartError } = await event.locals.sb
		.from('parts_2026')
		.select('part_id, name, quantity, num_in_use, alt_ids, image_url')
		.eq('part_id', partId)
		.maybeSingle<PartRecord>();

	if (directPartError) {
		console.error('Admin find part by part_id error:', directPartError);
		return null;
	}

	if (directPart) return directPart;

	const { data: altCandidates, error: altCandidatesError } = await event.locals.sb
		.from('parts_2026')
		.select('part_id, name, quantity, num_in_use, alt_ids, image_url')
		.not('alt_ids', 'is', null)
		.returns<PartRecord[]>();

	if (altCandidatesError) {
		console.error('Admin find part by alt_ids error:', altCandidatesError);
		return null;
	}

	const normalizedInput = partId.toLowerCase();
	return (
		(altCandidates ?? []).find((part: PartRecord) =>
			normalizeAltIds(part.alt_ids).some((altId) => altId.toLowerCase() === normalizedInput)
		) ?? null
	);
}

export const load: PageServerLoad = async (event) => {
	const parentData = await event.parent();
	if (!parentData?.session) {
		throw redirect(302, '/login');
	}
	if (!parentData?.is_admin) {
		throw redirect(302, '/');
	}

	const [
		{ data: applications, error: applicationsError },
		{ data: teams, error: teamsError },
		{ data: checkoutRows, error: checkoutsError },
		{ data: partRows, error: partsError },
		{ data: adminRows, error: adminsError }
	] = await Promise.all([
		event.locals.sb.from('applications_2026').select('*'),
		event.locals.sb.from('teams_2026').select('id, team_name'),
		event.locals.sb.from('teams_parts_2026').select('team_id, part_id, quantity'),
		event.locals.sb.from('parts_2026').select('part_id, name'),
		event.locals.sb
			.from('admins_2026')
			.select('id, email, created_at')
			.order('created_at', { ascending: true })
	]);

	if (applicationsError) {
		console.error('Admin fetch applications error:', applicationsError);
	}

	if (teamsError) {
		console.error('Admin fetch teams error:', teamsError);
	}

	if (checkoutsError) {
		console.error('Admin fetch team checkouts error:', checkoutsError);
	}

	if (partsError) {
		console.error('Admin fetch parts for checkouts error:', partsError);
	}

	if (adminsError) {
		console.error('Admin fetch admins error:', adminsError);
	}

	const partNameById = new Map<string, string>();
	for (const part of (partRows ?? []) as Array<{ part_id: string; name: string | null }>) {
		if (part?.part_id) {
			partNameById.set(part.part_id, part.name ?? 'Unknown part');
		}
	}

	const teamCheckouts = ((checkoutRows ?? []) as TeamPartCheckoutRecord[]).map((checkout) => ({
		team_id: checkout.team_id,
		part_id: checkout.part_id,
		quantity: checkout.quantity ?? 0,
		part_name: partNameById.get(checkout.part_id) ?? 'Unknown part'
	}));

	return {
		applications: applications ?? [],
		teams: teams ?? [],
		admins: (adminRows ?? []) as AdminRecord[],
		teamCheckouts,
		error:
			applicationsError?.message ??
			teamsError?.message ??
			checkoutsError?.message ??
			partsError?.message ??
			adminsError?.message
	};
};

async function requireAdmin(event: import('@sveltejs/kit').RequestEvent): Promise<boolean> {
	if (!event.locals.session?.user?.email) return false;
	const { data } = await event.locals.sb
		.from('admins_2026')
		.select('email')
		.eq('email', event.locals.session.user.email)
		.limit(1);
	return (data?.length ?? 0) > 0;
}

export const actions: Actions = {
	findPart: async (event) => {
		if (!(await requireAdmin(event))) {
			return fail(403, { error: 'Forbidden' });
		}

		const formData = await event.request.formData();
		const partLookupId = formData.get('partLookupId')?.toString().trim() ?? '';

		if (!partLookupId) {
			return fail(400, {
				partLookupId,
				lookupError: 'Enter a part ID to search.'
			});
		}

		const foundParts = await findPartMatchesBySearchTerm(event, partLookupId);
		if (!foundParts.length) {
			return fail(404, {
				partLookupId,
				lookupError: `No part found for ID: ${partLookupId}.`
			});
		}

		return {
			partLookupId,
			foundPart: serializePart(foundParts[0]),
			foundParts: foundParts.map((part: PartRecord) => serializePart(part)),
			lookupSuccess:
				foundParts.length === 1
					? `Found part ${foundParts[0].part_id}.`
					: `Found ${foundParts.length} possible matches for "${partLookupId}".`
		};
	},

	cancelCheckout: async (event) => {
		if (!(await requireAdmin(event))) {
			return fail(403, { error: 'Forbidden' });
		}

		return {
			partLookupId: '',
			foundPart: null,
			lookupSuccess: null,
			checkoutSuccess: null
		};
	},

	checkoutPart: async (event) => {
		if (!(await requireAdmin(event))) {
			return fail(403, { error: 'Forbidden' });
		}

		const formData = await event.request.formData();
		const partLookupId = formData.get('partLookupId')?.toString().trim() ?? '';
		const selectedPartId = formData.get('selectedPartId')?.toString().trim() ?? '';
		const teamId = formData.get('teamId')?.toString().trim() ?? '';
		const quantityRaw = formData.get('quantity')?.toString().trim() ?? '';

		if (!selectedPartId || !teamId || !quantityRaw) {
			return fail(400, {
				partLookupId,
				checkoutError: 'Part, team, and quantity are required.'
			});
		}

		const quantity = Number.parseInt(quantityRaw, 10);
		if (!Number.isInteger(quantity) || quantity <= 0) {
			return fail(400, {
				partLookupId,
				checkoutError: 'Quantity must be a positive integer.'
			});
		}

		const foundPart = await findPartByAnyId(event, selectedPartId);
		if (!foundPart) {
			return fail(404, {
				partLookupId,
				checkoutError: 'Selected part no longer exists.'
			});
		}

		const available = (foundPart.quantity ?? 0) - (foundPart.num_in_use ?? 0);
		if (quantity > available) {
			return fail(400, {
				partLookupId,
				foundPart: serializePart(foundPart),
				checkoutError: `Only ${Math.max(available, 0)} available for checkout.`
			});
		}

		const checkoutTeamId = await resolveCheckoutTeamId(event, teamId);
		if (!checkoutTeamId) {
			return fail(400, {
				partLookupId,
				foundPart: serializePart(foundPart),
				checkoutError: 'Could not resolve a valid team id for checkout.'
			});
		}

		const { error: insertCheckoutError } = await event.locals.sb.from('teams_parts_2026').insert({
			team_id: checkoutTeamId,
			part_id: foundPart.part_id,
			quantity
		});

		if (insertCheckoutError) {
			console.error('Admin checkout insert error:', insertCheckoutError);
			return fail(500, {
				partLookupId,
				foundPart: serializePart(foundPart),
				checkoutError: insertCheckoutError.message
			});
		}

		const nextNumInUse = (foundPart.num_in_use ?? 0) + quantity;
		const { error: updatePartError } = await event.locals.sb
			.from('parts_2026')
			.update({ num_in_use: nextNumInUse })
			.eq('part_id', foundPart.part_id);

		if (updatePartError) {
			console.error('Admin checkout update part error:', updatePartError);
			return fail(500, {
				partLookupId,
				foundPart: serializePart(foundPart),
				checkoutError: updatePartError.message
			});
		}

		const refreshedPart = {
			...foundPart,
			num_in_use: nextNumInUse
		};

		return {
			partLookupId,
			foundPart: serializePart(refreshedPart),
			checkoutSuccess: `Checked out ${quantity} of ${foundPart.part_id} to team ${teamId}.`
		};
	},

	returnTeamPart: async (event) => {
		if (!(await requireAdmin(event))) {
			return fail(403, { error: 'Forbidden' });
		}

		const formData = await event.request.formData();
		const teamIdRaw = formData.get('teamId')?.toString().trim() ?? '';
		const partId = formData.get('partId')?.toString().trim() ?? '';
		const quantityRaw = formData.get('quantity')?.toString().trim() ?? '';

		if (!teamIdRaw || !partId || !quantityRaw) {
			return fail(400, {
				returnCheckoutError: 'Team and part are required to return a checkout.'
			});
		}

		const quantity = Number.parseInt(quantityRaw, 10);
		if (!Number.isInteger(quantity) || quantity <= 0) {
			return fail(400, {
				returnCheckoutError: 'Checkout quantity must be a positive integer.'
			});
		}

		const numericTeamId = Number.parseInt(teamIdRaw, 10);
		const teamId = Number.isNaN(numericTeamId) ? teamIdRaw : numericTeamId;

		const { data: checkoutRecord, error: checkoutRecordError } = await event.locals.sb
			.from('teams_parts_2026')
			.select('team_id, part_id, quantity')
			.eq('team_id', teamId)
			.eq('part_id', partId)
			.eq('quantity', quantity)
			.maybeSingle<TeamPartCheckoutRecord>();

		if (checkoutRecordError) {
			console.error('Admin fetch checkout to return error:', checkoutRecordError);
			return fail(500, {
				returnCheckoutError: checkoutRecordError.message
			});
		}

		if (!checkoutRecord) {
			return fail(404, {
				returnCheckoutError: 'Checkout record not found.'
			});
		}

		const quantityToReturn = Math.max(checkoutRecord.quantity ?? 0, 0);

		const { data: partRow, error: partFetchError } = await event.locals.sb
			.from('parts_2026')
			.select('part_id, num_in_use')
			.eq('part_id', checkoutRecord.part_id)
			.maybeSingle<{ part_id: string; num_in_use: number | null }>();

		if (partFetchError) {
			console.error('Admin fetch part before return error:', partFetchError);
			return fail(500, {
				returnCheckoutError: partFetchError.message
			});
		}

		if (!partRow) {
			return fail(404, {
				returnCheckoutError: 'Part for checkout record no longer exists.'
			});
		}

		const { error: deleteCheckoutError } = await event.locals.sb
			.from('teams_parts_2026')
			.delete()
			.eq('team_id', teamId)
			.eq('part_id', checkoutRecord.part_id)
			.eq('quantity', quantity);

		if (deleteCheckoutError) {
			console.error('Admin delete checkout error:', deleteCheckoutError);
			return fail(500, {
				returnCheckoutError: deleteCheckoutError.message
			});
		}

		const nextNumInUse = Math.max((partRow.num_in_use ?? 0) - quantityToReturn, 0);
		const { error: updatePartError } = await event.locals.sb
			.from('parts_2026')
			.update({ num_in_use: nextNumInUse })
			.eq('part_id', checkoutRecord.part_id);

		if (updatePartError) {
			console.error('Admin update part after return error:', updatePartError);
			return fail(500, {
				returnCheckoutError: updatePartError.message
			});
		}

		return {
			returnCheckoutSuccess: `Returned ${quantityToReturn} of ${checkoutRecord.part_id} for team ${teamIdRaw}.`
		};
	},

	deleteTeam: async (event) => {
		if (!(await requireAdmin(event))) {
			return fail(403, { error: 'Forbidden' });
		}

		const formData = await event.request.formData();
		const teamIdRaw = formData.get('teamId')?.toString().trim() ?? '';

		if (!teamIdRaw) {
			return fail(400, {
				teamDeleteError: 'Missing team id.'
			});
		}

		const numericTeamId = Number.parseInt(teamIdRaw, 10);
		const teamId = Number.isNaN(numericTeamId) ? teamIdRaw : numericTeamId;

		const { error: clearCheckoutsError } = await event.locals.sb
			.from('teams_parts_2026')
			.delete()
			.eq('team_id', teamId);

		if (clearCheckoutsError) {
			console.error('Admin clear team checkouts before delete error:', clearCheckoutsError);
			return fail(500, {
				teamDeleteError: clearCheckoutsError.message
			});
		}

		const { error: clearMembersError } = await event.locals.sb
			.from('applications_2026')
			.update({ team_id: null })
			.eq('team_id', teamId);

		if (clearMembersError) {
			console.error('Admin clear team members before delete error:', clearMembersError);
			return fail(500, {
				teamDeleteError: clearMembersError.message
			});
		}

		const { data: deletedTeams, error: deleteTeamError } = await event.locals.sb
			.from('teams_2026')
			.delete()
			.eq('id', teamId)
			.select('id, team_name')
			.returns<Array<{ id: string | number; team_name: string | null }>>();

		if (deleteTeamError) {
			console.error('Admin delete team error:', deleteTeamError);
			return fail(500, {
				teamDeleteError: deleteTeamError.message
			});
		}

		if (!deletedTeams?.length) {
			return fail(404, {
				teamDeleteError: 'Team not found.'
			});
		}

		const deletedTeam = deletedTeams[0];
		return {
			teamDeleteSuccess: `Deleted team ${deletedTeam.team_name ?? teamIdRaw}.`
		};
	},

	approve: async (event) => {
		if (!(await requireAdmin(event))) {
			return fail(403, { error: 'Forbidden' });
		}

		const formData = await event.request.formData();
		const uid = formData.get('uid')?.toString();
		if (!uid) return fail(400, { error: 'Missing uid' });

		const { error } = await event.locals.sb
			.from('applications_2026')
			.update({ status: 'accepted' })
			.eq('uid', uid);

		if (error) {
			console.error('Admin approve error:', error);
			return fail(500, { error: error.message });
		}
		return { success: true, action: 'approved' };
	},

	reject: async (event) => {
		if (!(await requireAdmin(event))) {
			return fail(403, { error: 'Forbidden' });
		}

		const formData = await event.request.formData();
		const uid = formData.get('uid')?.toString();
		if (!uid) return fail(400, { error: 'Missing uid' });

		const { error } = await event.locals.sb
			.from('applications_2026')
			.update({ status: 'rejected' })
			.eq('uid', uid);

		if (error) {
			console.error('Admin reject error:', error);
			return fail(500, { error: error.message });
		}
		return { success: true, action: 'rejected' };
	},

	addAdmin: async (event) => {
		if (!(await requireAdmin(event))) {
			return fail(403, { error: 'Forbidden' });
		}

		const formData = await event.request.formData();
		const email = formData.get('email')?.toString().trim().toLowerCase() ?? '';

		if (!email) {
			return fail(400, {
				adminAddError: 'Email is required.'
			});
		}

		if (!email.includes('@')) {
			return fail(400, {
				adminAddError: 'Enter a valid email address.'
			});
		}

		const { error } = await event.locals.sb.from('admins_2026').insert({
			email,
			created_at: new Date().toISOString()
		});

		if (error) {
			console.error('Admin add admin error:', error);
			if (error.code === '23505') {
				return fail(409, {
					adminAddError: 'That email is already an admin.'
				});
			}

			return fail(500, {
				adminAddError: error.message
			});
		}

		return {
			adminAddSuccess: `Added ${email} as an admin.`
		};
	}
};
