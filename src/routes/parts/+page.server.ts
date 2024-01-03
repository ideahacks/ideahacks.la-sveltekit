export async function load({ locals: { supabase } }) {
	const { data, error } = await supabase.from('parts').select();

	if (error) {
		return { parts: null };
	}

	return { parts: data };
}
