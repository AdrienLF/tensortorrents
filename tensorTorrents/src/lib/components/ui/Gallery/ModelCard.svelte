<script lang="ts">
	import { onMount } from 'svelte';
	import type { ModelData } from '$lib/types/ModelData';
	import type { Version } from '$lib/types/Versions';
	import { Rating } from 'flowbite-svelte';

	export let model: ModelData;
	export let versions: Version;
	export let supabase;
    export let index

	console.log(model);

	let example_data = {
		model_id: 29,
		name: 'FUllModel',
		checkpoint_type: 'Trained',
		category: 'Character',
		description: 'FUll model',
		upload_date: '2024-01-08T03:57:08.438131+00:00',
		rating: null,
		type_id: 1,
		imgur_link: 'https://imgur.com/a/buLJ6',
		modeltypes: { name: 'Checkpoint', type_id: 1 }
	};

	let model_images = [];
	let profilePicture = '';

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
	});

    let model_link = "/models/" + model.model_id
</script>


<div class="modelCard">
    <a href={model_link} class="modelCard">
	<!-- <div class="profileHeader">
            <img class="profileImage" src={profilePicture} alt={model.name} />
            <div class="modelName">{model.name}</div>
        </div> -->
        
	<img
		class="mainImage"
		src={model_images.length > 0 ? model_images[0].src : 'default-image.png'}
		alt={model.name}
	/>
        

	<div class="checkpointInfo">
		{model.modeltypes ? model.modeltypes.name : 'Default Type Name'}
	</div>

	<div class="modelInfo">
		{model ? model.name : 'Default Name'}
		<div class="rating">
			<Rating size="18" total="5" rating={model.rating ? String(model.rating) : '0'} />
		</div>
	</div>
</a>
</div>

<style>
	.modelCard {
		display: grid;

		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		overflow: hidden;
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
		overflow: hidden;
		margin-left: 10px;
		margin-top: 100%;
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
