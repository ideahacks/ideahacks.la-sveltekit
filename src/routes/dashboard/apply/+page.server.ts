import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const load: PageServerLoad = async (event) => {
	// Check if user is authenticated
	if (!event.locals.session) {
		// Redirect to login if not authenticated
		throw redirect(302, '/login');
	}

	return {
		session: event.locals.session
	};
};

export const actions: Actions = {
	submit: async (event) => {
		// Check authentication
		if (!event.locals.session) {
			return fail(401, { error: 'Unauthorized' });
		}

		const formData = await event.request.formData();
		
		// Extract form fields
		const name = formData.get('name')?.toString() || '';
		const preferredName = formData.get('preferredName')?.toString() || '';
		const pronouns = formData.get('pronouns')?.toString() || '';
		const school = formData.get('school')?.toString() || '';
		const year = formData.get('year')?.toString() || '';
		const isTransfer = formData.get('isTransfer') === 'on' ? 'Yes' : 'No';
		const major = formData.get('major')?.toString() || '';
		const priorEngineeringExperience = formData.get('priorEngineeringExperience')?.toString() || '';
		const whyIdeaHacks = formData.get('whyIdeaHacks')?.toString() || '';
		const hackathonIdeas = formData.get('hackathonIdeas')?.toString() || '';
		const priorHackathonExperience = formData.get('priorHackathonExperience')?.toString() || '';
		const suggestedParts = formData.get('suggestedParts')?.toString() || '';
		const shirtSize = formData.get('shirtSize')?.toString() || '';
		const dietaryRestrictions = formData.get('dietaryRestrictions')?.toString() || '';
		
		// Get user info
		const email = event.locals.session.user.email || '';
		const uid = event.locals.session.user.id || '';

		// Validate required fields
		if (!name || !school || !year || !major || !priorEngineeringExperience || !whyIdeaHacks || !hackathonIdeas) {
			return fail(400, { error: 'Please fill out all required fields.' });
		}

		const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

		try {
			const { error } = await supabaseAdmin.from('applications').insert({
				uid,
				email,
				name,
				preferred_name: preferredName,
				pronouns,
				school,
				year,
				transfer: isTransfer,
				major,
				prior_engineering_experience: priorEngineeringExperience,
				why_ideahacks: whyIdeaHacks,
				hackathon_ideas: hackathonIdeas,
				prior_hackathon_experience: priorHackathonExperience,
				suggested_parts: suggestedParts,
				shirt_size: shirtSize,
				dietary_restrictions: dietaryRestrictions
			});

			if (error) {
				console.error('Supabase insert error:', error);
				return fail(500, { error: 'Failed to submit application. Please try again.' });
			}

			return {
				success: true,
				message: 'Application submitted successfully!'
			};
		} catch (err) {
			console.error('Unexpected error submitting to Supabase:', err);
			return fail(500, { error: 'Failed to submit application. Please try again.' });
		}

			
		
	}
};
