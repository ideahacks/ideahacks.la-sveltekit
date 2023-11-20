import { json } from '@sveltejs/kit';

export async function POST({ request, locals: { supabase, getSession } }) {
	const formData = await request.json();
	// const formData = {
	//     full_name: 'paul zhang',
	//     preferred_name: 'kevin',
	//     pronouns: '',
	//     school: 'University of California, Los Angeles',
	//     major: 'cse',
	//     year_at_current_university: 'first',
	//     is_transfer: false,
	//     prior_engineering_experience: 'a ',
	//     why_ideahacks: 'a',
	//     hackathon_ideas: 'a',
	//     prior_hackathon_experience: '',
	//     suggested_parts: '',
	//     needs_housing_assistance: false,
	//     shirt_size: 'medium',
	//     dietary_restrictions: ''
	// }

	// console.log(formData);

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
