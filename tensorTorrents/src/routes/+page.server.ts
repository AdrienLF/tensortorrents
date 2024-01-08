
import { get_models } from '$lib/server/database/get_models'


export async function load({ locals: { supabase } }) {
	// Fetch the base models
	const models = await get_models(supabase);
	
  
	return {
		status: 200,
		props: {
			models: models,
	
		}
	};
  }