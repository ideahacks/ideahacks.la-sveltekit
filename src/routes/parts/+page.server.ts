import prisma from '$lib/prisma';
import Fuse from 'fuse.js';

export async function load() {
    const parts = await prisma.part.findMany();
	
	const fuseOptions = {
		// isCaseSensitive: false,
		// includeScore: false,
		// shouldSort: true,
		// includeMatches: false,
		// findAllMatches: false,
		// minMatchCharLength: 1,
		// location: 0,
		// threshold: 0.6,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		// fieldNormWeight: 1,
		keys: [
			"name"
		]
	};
	
	const fuse = new Fuse(parts, fuseOptions);
	
	// Change the pattern
	const searchPattern = "con"
	
	const fuseResults = fuse.search(searchPattern)

	return {
		summaries: fuseResults.map((parts) => ({
			name: parts.item.name,
			quantity: parts.item.quantity
		}))
	};
}