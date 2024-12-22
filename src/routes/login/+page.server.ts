import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ locals }) => {
		const { data: data, error: err } = await locals.sb.auth.signInWithOAuth({
			provider: 'google'
		});

		if (err) {
			console.log(err);
			return fail(400, {
				message: 'Something went wrong.'
			});
		}

		throw redirect(303, data.url);
	}
};
