import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: parts, error: partsFetchError } = await locals.sb.from('parts_2026').select();

	if (partsFetchError) {
		throw error(500, 'Could not retrieve parts');
	}

	const list = parts ?? [];
	for (let i = 0; i < list.length; i++) {
		const p = list[i];
		p.requires_checkout = p.requires_checkout === 'Checkout';
		if (p.tags && typeof p.tags === 'string') {
			p.tags = p.tags.split(', ').filter(Boolean);
		} else {
			p.tags = [];
		}
		if (p.alt_ids && typeof p.alt_ids === 'string') {
			p.alt_ids = p.alt_ids.split(',').map((s: string) => s.trim()).filter(Boolean);
		} else {
			p.alt_ids = [];
		}
	}

	return { parts: list };
};
