import { error, redirect, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			console.log(next);
			throw redirect(303, `/${next.slice(1)}`);
		}
	}

	// return the user to an error page with instructions
	throw error(500, 'Error logging in, please try again or email webmaster@ieeebruins.com');
}
