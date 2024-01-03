import { json } from '@sveltejs/kit';

export async function POST({ request, locals: { supabase, getSession } }) {
	const formData = await request.json();
	const session = await getSession();

	// TODO: Improve error handling :shrug:
	if (!session) {
		return json(false);
	}

	formData.user_id = session.user.id;

	const { error } = await supabase.from('applications').upsert(formData).select();
	console.log(error);

	return json(true);
}

export async function GET({ request, locals: { supabase, getSession } }) {
	const { data } = await supabase.from('applications').select();
	if (!data || data.length === 0) {
		return json(null);
	} else {
		return json(data[0]);
	}
}
