import { error, redirect } from '@sveltejs/kit';

// TODO: set it so that on load the user will be redirected if they have the wrong auth state
export const actions = {
	create: async (event) => {
		// get the form body from the event
		const formData = await event.request.formData();
		const firstName = formData.get('first_name');
		const lastName = formData.get('last_name');
		if (!firstName || !lastName) {
			throw error(400, 'Must send a valid first name and last name');
		}


		throw redirect(301, '/dashboard');
	}
};