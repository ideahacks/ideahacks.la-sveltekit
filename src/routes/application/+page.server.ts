import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define outside the load function so the adapter can be cached
const formSchema = z.object({
	full_name: z.string().min(1),
	preferred_name: z.string(),
	email: z.string().email(),
	pronouns: z.string(),
	school: z.string().min(1),
	school_if_other: z.string(),
	major: z.string().min(1),
	year_at_current_university: z.string().min(1),
	prior_engineering_experience: z.string().min(1).max(250),
	why_ideahacks: z.string().min(1).max(250),
	hackathon_ideas: z.string().min(1).max(100),
	prior_hackathon_experience: z.string().min(1).max(50),
	suggested_parts: z.string(),
	shirt_size: z.string().min(1),
	dietary_restrictions: z.string()
});

export const load = async () => {
	const form = await superValidate(zod(formSchema));

	// Always return { form } in load functions
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(formSchema));
		console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		return { form };
	}
};
