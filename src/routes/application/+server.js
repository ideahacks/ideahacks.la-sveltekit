// import { json } from '@sveltejs/kit';

// export async function POST({ request, locals: { supabase, getSession } }) {
// 	const formData = await request.json();
// 	const session = await getSession();

// 	// TODO: Improve error handling :shrug:
// 	if (!session) {
// 		return json(false);
// 	}

// 	formData.user_id = session.user.id;

// 	const { error } = await supabase.from('applications_2025').upsert(formData).select();
// 	console.log(error);

// 	return json(true);
// }
