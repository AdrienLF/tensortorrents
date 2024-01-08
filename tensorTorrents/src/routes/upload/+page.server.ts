import { insert_row } from '$lib/server/database/insert_row.js';
import { uploadFormDataToSupabase } from '$lib/server/database/uploadFormDataToSupabase.js';
import { get_base_models } from '$lib/server/database/get_base_models.js';
import { get_model_types } from '$lib/server/database/get_model_types.js';

export const actions = {
	submit_torrent: async ({ request, locals: { supabase, getSession } }) => {
		const data = await request.formData();
		console.log(data);
		const name = data.get('name');
		console.log(name);
		const type = data.get('type');
		console.log(type);
    const description = data.get('description');
		console.log(description);

		uploadFormDataToSupabase(data, supabase);
	}
};

export async function load({ locals: { supabase } }) {
  // Fetch the base models
  const basemodels = await get_base_models(supabase);
  const modeltypes = await get_model_types(supabase);

  return {
      status: 200,
      props: {
          basemodels: basemodels,
		  modeltypes: modeltypes
      }
  };
}