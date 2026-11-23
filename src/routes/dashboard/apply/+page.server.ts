import { error, fail, redirect } from '@sveltejs/kit';
import { getApplicationUser, getApplicationWindow } from '$lib/server/applications';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await getApplicationUser(locals);
	if (!user) redirect(302, '/login');
	if (getApplicationWindow() !== 'open') redirect(302, '/dashboard');

	const { data: application, error: fetchError } = await locals.sb
		.from('applications_2027')
		.select('status')
		.eq('uid', user.id)
		.maybeSingle();

	if (fetchError) {
		console.error('Could not check for an existing 2027 application', fetchError.code);
		error(500, 'Could not check your application status. Please try again.');
	}
	if (application) redirect(302, '/dashboard');
};

export const actions: Actions = {
	submit: async ({ locals, request }) => {
		if (!(await getApplicationUser(locals))) {
			return fail(401, { error: 'Please log in before submitting an application.' });
		}

		const fields = await request.formData();
		const answer = (name: string) => {
			const value = fields.get(name);
			return typeof value === 'string' ? value.trim() : '';
		};

		const requiredAnswers = {
			name: answer('name'),
			school: answer('school'),
			year: answer('year'),
			major: answer('major'),
			prior_engineering_experience: answer('priorEngineeringExperience'),
			why_ideahacks: answer('whyIdeaHacks'),
			hackathon_ideas: answer('hackathonIdeas')
		};

		if (getApplicationWindow() !== 'open') {
			return fail(403, { error: 'Applications are not open.' });
		}
		if (Object.values(requiredAnswers).some((value) => !value)) {
			return fail(400, { error: 'Please fill out all required fields.' });
		}

		const { error: insertError } = await locals.sb.from('applications_2027').insert(
			{
				...requiredAnswers,
				preferred_name: answer('preferredName') || null,
				pronouns: answer('pronouns') || null,
				transfer: fields.get('isTransfer') === 'on' ? 'Yes' : 'No',
				prior_hackathon_experience: answer('priorHackathonExperience') || null,
				suggested_parts: answer('suggestedParts') || null,
				shirt_size: answer('shirtSize') || null,
				dietary_restrictions: answer('dietaryRestrictions') || null
			},
			{ defaultToNull: false }
		);

		// A repeat submission lands on the status page without replacing the existing answers.
		if (!insertError || insertError.code === '23505') redirect(303, '/dashboard');

		console.error('Could not submit 2027 application', insertError.code);
		return fail(500, { error: 'Failed to submit application. Please try again.' });
	}
};
