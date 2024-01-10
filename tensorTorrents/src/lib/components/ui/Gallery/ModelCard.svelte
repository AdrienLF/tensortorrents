<script lang="ts">
	import { onMount } from 'svelte';
	import type { ModelData } from '$lib/types/ModelData';
	import type { Version } from '$lib/types/Versions';
	import { Rating } from 'flowbite-svelte';

	export let model: ModelData;
	export let versions: Version;
	export let supabase;
	export let index;

	console.log(model);

	let model_images = [];
	let profilePicture = '';
	let avatarUrl = '';

	async function downloadImage(path: string) {
		console.log(path);
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);
			
            console.log(error);
			console.log(data);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
			console.log(avatar_url);
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	}

	if (model.imgur_link != null) {
		let imgur_id_length = model.imgur_link.split('/').length;

		let albumImages = [];
		let albumHash = model.imgur_link.split('/')[imgur_id_length - 1];
		console.log(albumHash);

		onMount(async () => {
			try {
				const response = await fetch(`/getAlbumImages?albumHash=${albumHash}`);
				console.log(response);
				if (response.ok) {
					const imgurImages = await response.json();
					console.log(imgurImages);

					// Transforming the data to the desired format
					model_images = imgurImages.map((img) => ({
						alt: img.title || 'Image from Imgur', // Use the title or a default description
						src: img.link, // The URL of the image
						title: img.description || 'No description' // Use the description or a default
					}));
					console.log(model_images);
					console.log(model_images[0].src);
				} else {
					console.error('Failed to load images:', response.status, response.statusText);
				}
			} catch (e) {
				console.error('Error fetching images:', e.message);
			}
		});
	}

	onMount(async () => {
		try {
			await downloadImage(model.owner.avatar_url);
		} finally {
			try {
				const response = await fetch(`/api/get_all_model_info?model_id=${model.model_id}`);
				console.log(response);
				if (response.ok) {
					const { models, versions } = await response.json();

					console.log(models);
					console.log(versions);
				} else {
					console.error('Failed to load images:', response.status, response.statusText);
				}
			} catch (e) {
				console.error('Error fetching images:', e.message);
			}
		}
	});

	let model_link = '/models/' + model.model_id;
</script>

<div class="modelCard">
	<a href={model_link} class="modelCard">
		

		<img
			class="mainImage"
			src={model_images.length > 0 ? model_images[0].src : 'default-image.png'}
			alt={model.name}
		/>

      
        
        {#if model.owner}
        <div class="profileHeader">
			<img class="profileImage" src={avatarUrl} alt={model.name} />
			<div class="username">{model.owner.username}</div>
		</div>
        {/if}
       

		<div class="checkpointInfo">
			{model.modeltypes ? model.modeltypes.name : 'Default Type Name'}
		</div>

		<div class="modelInfo">
            <div class="modelName">
			{model ? model.name : 'Default Name'}
        </div>
			<div class="rating">
				<Rating size="18" total="5" rating={model.rating ? String(model.rating) : '0'} />
			</div>
		</div>

    
	</a>
</div>

<style>
    .backgroundGradient {
        grid-area: 1 / 1;
        display: block;
        position:relative;
        bottom:0;
        height: 100%;
        width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
    z-index: 0;
    }


	.modelCard {
		display: grid;

		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

    .profileHeader {
        display: flex;
        flex-direction: row;
        align-items: center;
        grid-area: 1 / 1;
        margin-left: 10px;
		margin-top: 50%;
        font-size: 15;
        font-weight: 500;
    }

    .profileImage {
        height : 35px;
        width:35px;
        border-radius: 4px;
        margin-right:1em;
		object-fit:cover;
    }
	.checkpointInfo {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji';
		font-weight: 700;
		font-size: 12px;
		display: flex;
		align-items: center;
		grid-area: 1 / 1;
		border-radius: 32px;
		background-color: rgba(0, 0, 0, 0.3);
		height: 26px;
		width: max-content;
		padding: 4px 10px;
		margin-left: 10px;
		margin-top: 10px;
	}

	.rating {
		border-radius: 32px;
		background-color: rgba(0, 0, 0, 0.3);
		height: 26px;
		width: max-content;
		padding: 4px 10px;
		display: flex;
		align-items: center;
	}

	.modelInfo {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji';

		display: flex;
		flex-direction: column;

        grid-area: 1 / 1;
  font-weight: 700;
  font-size: 20px;
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Show ellipsis for overflowed text */
  white-space: nowrap; /* Keep text in a single line */
  max-height: fit-content; /* Adjust as needed, or consider limiting lines */
  margin-left: 10px;
  margin-top: 100%;
	}

    .modelName {
        min-height: 30px;
    }

	a {
		grid-area: 1 / 1;
	}

	.mainImage {
		grid-area: 1 / 1;
		width: 100%;
		display: block;
	}
</style>
