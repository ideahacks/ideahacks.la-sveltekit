// Set to 'closed' to hide the apply link and block new submissions.
export const applicationWindow: 'upcoming' | 'open' | 'closed' = 'open';

export async function getApplicationUser(locals: App.Locals) {
	if (!locals.session) return null;
	const { data, error } = await locals.sb.auth.getUser();
	return error ? null : data.user;
}
