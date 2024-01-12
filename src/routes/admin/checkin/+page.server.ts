export async function load({ locals: { supabase }, parent }) {
	await parent();

	const { data: parts, error: partsError } = await supabase.from('parts').select();

	if (partsError) {
		return { parts: null };
	}

	return { parts };
}
