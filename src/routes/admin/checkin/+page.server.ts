export async function load({ locals: { supabase } }) {
	const { data: parts, error: partsError } = await supabase.from('parts').select();

	if (partsError) {
		return { parts: null };
	}

	return { parts };
}
