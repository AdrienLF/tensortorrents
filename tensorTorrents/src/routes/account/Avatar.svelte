<!-- src/routes/account/Avatar.svelte -->
<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js'
	import { createEventDispatcher } from 'svelte'
    import { Button } from 'flowbite-svelte';

	export let size = 10
	export let url: string
	export let supabase: SupabaseClient

	
	let uploading = false
	let files: FileList
	let avatar_public_url : string 

    console.log(url)

	const dispatch = createEventDispatcher()

	

	const uploadAvatar = async () => {
		try {
			uploading = true

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.')
			}

			const file = files[0]
			const fileExt = file.name.split('.').pop()
			const filePath = `${Math.random()}.${fileExt}`

            console.log(file)

			const { error } = await supabase.storage.from('avatars').upload(filePath, file)
            console.log(error)

			const { data, url_error } = await supabase.storage.from('avatars').getPublicUrl(filePath)
			console.log(data)
			avatar_public_url = data.publicUrl
            console.log(url_error)

			if (error) {
				throw error
			}

			url = avatar_public_url
			setTimeout(() => {
				dispatch('upload')
			}, 100)
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message)
			}
		} finally {
			uploading = false
		}
	}

</script>

<div>
	{#if url}
    <div class="avatar">
		<img
			src={url}
			alt={url ? 'Avatar' : 'No image'}
			class="avatar image"
			style="height: {size}em; width: {size}em;"
		/>
    </div>
	{:else}
		<div class="avatar no-image" style="height: {size}em; width: {size}em;" />
	{/if}
	<input type="hidden" name="avatarUrl" value={avatar_public_url} />

	<div style="width: {size}em;" class="py-2">
        <Button><label class="button primary block" for="single">
			{uploading ? 'Uploading ...' : 'Update your avatar'}
		</label></Button>
		
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>

<style>

    .avatar {
        border-radius: 999994Px;
        overflow: hidden;
        margin:20px 0px;
		object-fit: cover;
    }
</style>