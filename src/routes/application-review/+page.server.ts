import { error } from '@sveltejs/kit';
export const load = async ({ locals: { supabase } }) => {
    const { data: applications, error: applicationError } = await supabase.from('applications').select();
    if (applicationError) {
        throw error(500, 'Could not retrieve apps, try again or email webmaster@ieeebruins.com');
    }
    return { applications: applications ?? [] };
};