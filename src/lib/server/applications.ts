import { env } from '$env/dynamic/private';

export function getApplicationWindow(now = Date.now()) {
	const opensAt = parseTimestamp(env.APPLICATIONS_2027_OPEN_AT);
	const closesAt = parseTimestamp(env.APPLICATIONS_2027_CLOSE_AT);

	if (!Number.isFinite(opensAt) || !Number.isFinite(closesAt) || opensAt >= closesAt) {
		return 'unavailable';
	}
	if (now < opensAt) return 'upcoming';
	if (now >= closesAt) return 'closed';
	return 'open';
}

function parseTimestamp(value: string | undefined) {
	if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/.test(value)) {
		return NaN;
	}
	return Date.parse(value);
}

export async function getApplicationUser(locals: App.Locals) {
	if (!locals.session) return null;
	const { data, error } = await locals.sb.auth.getUser();
	return error ? null : data.user;
}
