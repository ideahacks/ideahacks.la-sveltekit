import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, data }) => {
	const { session } = await parent();

	if (!session) {
		throw redirect(307, '/login?next=parts');
	}

	return data;
};
