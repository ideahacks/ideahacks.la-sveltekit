import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define outside the load function so the adapter can be cached
const formSchema = z.object({
	full_name: z.string().min(1, 'Full name must be at least 1 character'),
	preferred_name: z.string(),
	email: z.string().email(),
	pronouns: z.string(),
	school: z.string().min(1, 'School name must be at least 1 character'),
	school_if_other: z.string(),
	major: z.string().min(1, 'Major must be at least 1 character'),
	year_at_current_university: z
		.string()
		.min(1, 'Year at current university must be at least 1 character'),
	prior_engineering_experience: z
		.string()
		.min(1, 'Must be at least 1 character')
		.max(1250, 'Must be at most 1250 characters'),
	why_ideahacks: z
		.string()
		.min(1, 'Must be at least 1 character')
		.max(1250, 'Must be at most 1250 characters'),
	hackathon_ideas: z
		.string()
		.min(1, 'Must be at least 1 character')
		.max(500, 'Must be at most 500 character'),
	prior_hackathon_experience: z
		.string()
		.min(1, 'Must be at least 1 character')
		.max(250, 'Must be at most 250 characters'),
	suggested_parts: z.string(),
	shirt_size: z.string().min(1, 'Must be at least 1 character'),
	dietary_restrictions: z.string()
});

export const load = async () => {
	const form = await superValidate(zod(formSchema));

	// Always return { form } in load functions
	return { form };
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, zod(formSchema));
		console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		} else {
			const new_form = {
				user_id: '1234', // This should be the user's ID
				...form.data
			};
			const { error } = await supabase.from('applications_2025').upsert(form.data).select();

			if (!error) {
				console.log('Application submitted successfully!');
			} else {
				console.log(error);
			}
		}

		return { form };
	}
};
