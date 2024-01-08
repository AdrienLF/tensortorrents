import { insert_row } from '$lib/server/database/insert_row.js';
import { uploadFormDataToSupabase } from '$lib/server/database/uploadFormDataToSupabase.js';
import { get_model_from_id } from '$lib/server/database/get_model_from_id.js';

export async function load({ locals: { supabase }, url }) {
  // Fetch the base models
  console.log(url.pathname)
  let pathname = url.pathname
  let model_id = pathname.split("/")[2]
  console.log(model_id)
  const {models, versions} = await get_model_from_id(supabase, model_id);
  console.log(models)

  return {
      status: 200,
      props: {
          model: models,
		  versions:versions
		  
      }
  };
}