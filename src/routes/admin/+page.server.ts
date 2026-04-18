import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	const parentData = await event.parent();
	if (!parentData?.session) {
		throw redirect(302, '/login');
	}
	if (!parentData?.is_admin) {
		throw redirect(302, '/');
	}

	const [{ data: applications, error: applicationsError }, { data: teams, error: teamsError }] =
		await Promise.all([
			event.locals.sb.from('applications_2026').select('*'),
			event.locals.sb.from('teams_2026').select('id, team_name')
		]);

	if (applicationsError) {
		console.error('Admin fetch applications error:', applicationsError);
	}

	if (teamsError) {
		console.error('Admin fetch teams error:', teamsError);
	}

	return {
		applications: applications ?? [],
		teams: teams ?? [],
		error: applicationsError?.message ?? teamsError?.message
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
	}
};
