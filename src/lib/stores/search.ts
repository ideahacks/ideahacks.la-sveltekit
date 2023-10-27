import Fuse from "fuse.js"
import { writable } from "svelte/store"

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
    data: T[]
    filtered: T[]
    search: string
}

export const createSearchStore = <T extends Record<PropertyKey, any>>(data: T[]) => {
    const { subscribe, set, update } = writable<SearchStoreModel<T>>({
        data: data, 
        filtered: data,
        search: "",
    })

    return {
        subscribe,
        set,
        update,
    }
}

export const searchHandler = <T extends Record<PropertyKey, any>>(store: SearchStoreModel<T>) => {
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
	
	const fuse = new Fuse(store.data, fuseOptions);
	
	// Change the pattern
	const searchPattern = store.search.toLowerCase() || ""
	
	const fuseResults = fuse.search(searchPattern)

    // store.filtered = {fuseResults.map((parts) => ({
    //     name: parts.item.name,
    //     quantity: parts.item.quantity,
    // })),}

    store.filtered = store.data.filter((item) => {
        return item.searchTerms.toLowerCase().includes(searchPattern)
    })
}