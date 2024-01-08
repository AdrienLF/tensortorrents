import type { Actions } from './$types'
import { get_models } from '$lib/server/database/get_models'
export const actions: Actions = {
	default: async (event) => {
    const { request, url, locals: { supabase } } = event
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
    
	}
}

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