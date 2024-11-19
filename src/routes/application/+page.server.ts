import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define outside the load function so the adapter can be cached
const formSchema = z.object({
	full_name: z.string().min(1, 'Please fill out this field'),
	preferred_name: z.string(),
	pronouns: z.string(),
	school: z.string().min(1, 'Please fill out this field'),
	school_if_other: z.string(),
	major: z.string().min(1, 'Please fill out this field'),
	year_at_current_university: z.string().min(1, 'Please pick a year'),
	prior_engineering_experience: z
		.string()
		.min(1, 'Please fill out this field')
		.max(1250, 'Must be at most 1250 characters'),
	why_ideahacks: z
		.string()
		.min(1, 'Please fill out this field')
		.max(1250, 'Must be at most 1250 characters'),
	hackathon_ideas: z
		.string()
		.min(1, 'Please fill out this field')
		.max(500, 'Must be at most 500 character'),
	prior_hackathon_experience: z
		.string()
		.min(1, 'Please fill out this field')
		.max(250, 'Must be at most 250 characters'),
	suggested_parts: z.string(),
	shirt_size: z.string().min(1, 'Please fill out this field'),
	dietary_restrictions: z.string()
});

export const load = async () => {
	const form = await superValidate(zod(formSchema));

	// Always return { form } in load functions
	return { form };
};

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const form = await superValidate(request, zod(formSchema));
		const session = await getSession();

		if (!session) {
			return fail(500, {
				form
			});
		}

		if (!form.valid) {
			return fail(400, {
				form
			});
		} else {
			const new_form = {
				user_id: session.user.id, // This should be the user's ID
				email: session.user.email,
				...form.data,
				school: form.data.school != 'Other' ? form.data.school : form.data.school_if_other
			};

			const { error } = await supabase.from('applications_2025').upsert(new_form).select();

			if (!error) {
				console.log('Application submitted successfully!');
			} else {
				console.log(error);
			}
		}

		return { form };
	}
};
