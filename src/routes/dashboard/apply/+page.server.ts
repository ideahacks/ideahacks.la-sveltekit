import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

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

		try {
			// Prepare data as form data for Google Apps Script
			// Google Apps Script expects form data, not JSON
			const submissionData = new URLSearchParams();
			submissionData.append('timestamp', new Date().toISOString());
			submissionData.append('name', name);
			submissionData.append('preferredName', preferredName);
			submissionData.append('pronouns', pronouns);
			submissionData.append('school', school);
			submissionData.append('year', year);
			submissionData.append('transfer', isTransfer);
			submissionData.append('major', major);
			submissionData.append('priorEngineeringExperience', priorEngineeringExperience);
			submissionData.append('whyIdeaHacks', whyIdeaHacks);
			submissionData.append('hackathonIdeas', hackathonIdeas);
			submissionData.append('priorHackathonExperience', priorHackathonExperience);
			submissionData.append('suggestedParts', suggestedParts);
			submissionData.append('shirtSize', shirtSize);
			submissionData.append('dietaryRestrictions', dietaryRestrictions);
			submissionData.append('email', email);
			submissionData.append('uid', uid);

			// Submit to Google Sheets via Google Apps Script Web App
			// Set GOOGLE_APPS_SCRIPT_URL in your .env file
			// In SvelteKit, use $env/static/private for server-side env vars
			const { GOOGLE_APPS_SCRIPT_URL } = await import('$env/static/private');
			const googleScriptUrl = GOOGLE_APPS_SCRIPT_URL || 
				'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

			// Use fetch with no-cors mode for Google Apps Script
			await fetch(googleScriptUrl, {
				method: 'POST',
				mode: 'no-cors',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: submissionData.toString()
			});

			// Since we're using no-cors, we can't check the response
			// But we'll assume success if no error was thrown
			
			return {
				success: true,
				message: 'Application submitted successfully!'
			};
		} catch (error) {
			console.error('Error submitting to Google Sheets:', error);
			return fail(500, { error: 'Failed to submit application. Please try again.' });
		}
	}
};
