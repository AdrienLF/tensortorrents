<script lang="ts">
	import { onMount } from 'svelte';
	import type { ModelData } from '$lib/types/ModelData.js';
	import type { VersionsArray } from '$lib/types/Versions.js';
	import type { Version } from '$lib/types/Versions.js';
	import { Button, Rating, AdvancedRating, ScoreRating, Carousel } from 'flowbite-svelte';

	import UserCard from '$lib/components/ui/Cards/UserCard.svelte';
	import ModelDetails from '$lib/components/ui/ModelDetails/ModelDetails.svelte';
	import ModelFiles from '$lib/components/ui/ModelDetails/ModelFiles.svelte';
	import { formatIsoDateString } from '$lib/utils/formatISOstrings.js';

	export let data;
	console.log(data);

	let { supabase, session } = data
  $: ({ supabase, session } = data)

	let model_data: ModelData = data.props.model[0];
	let versions: Version = data.props.versions;
	console.log(model_data);
	console.log(versions);

	let imgur_id_length = model_data.imgur_link.split('/').length;
	let imgur_id = 'a/' + model_data.imgur_link.split('/')[imgur_id_length - 1];

	console.log(imgur_id);

	let albumImages = [];
	let albumHash = model_data.imgur_link.split('/')[imgur_id_length - 1];
	
	onMount(async () => {
		try {
		const response = await fetch(`/getAlbumImages?albumHash=${albumHash}`);
		console.log(response);
		if (response.ok) {
                const imgurImages = await response.json();

                // Transforming the data to the desired format
                model_images = imgurImages.map(img => ({
                    alt: img.title || 'Image from Imgur', // Use the title or a default description
                    src: img.link, // The URL of the image
                    title: img.description || 'No description' // Use the description or a default
                }));
            } else {
                console.error('Failed to load images:', response.status, response.statusText);
            }
        } catch (e) {
            console.error('Error fetching images:', e.message);
        }
	});
</script>

<div class="container mx-auto py-4">
	<div class="modelHeader">
		<div class="modelInfo flex flex-row items-center">
			<div class="modelName text-xl font-medium">{model_data.name}</div>
			<Rating id="example-1b" total={5} size={25} rating={4.66} />
		</div>
		<div class="uploadInfo flex flex-row items-center gap-2">
			<div class="uploadDate text-xs">{formatIsoDateString(model_data.upload_date)}</div>
			|
			<div class="tags flex flex-row gap-2 py-2">
				<Button color="light" size="xs" class="modelCategory">Base Model</Button>
				|
				<div class="modelTags flex flex-row gap-2">
					<Button color="alternative" size="xs" class="modelTag">Photorealistic</Button>
					<Button color="alternative" size="xs" class="modelTag">Photo</Button>
				</div>
			</div>
		</div>
		<div class="modelVersions flex flex-row gap-2 py-2">
			{#each versions as version}
				<Button color="alternative" active size="xs" class="modelVersionName"
					>{version.version_name}</Button
				>
			{/each}
		</div>
	</div>

	<div class="modelContent flew-row flex gap-12">
		<div class="modelPreview flex-grow">
			<div class="previewImage flex flex-grow flex-col items-center align-middle">
				<!-- <blockquote class="imgur-embed-pub" lang="en" data-id={imgur_id} data-context="false" ></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
				 -->
			</div>
			
			{#if model_images.length > 0}
				<div class="gallery py-2">
					<Carousel images={model_images}  let:Indicators>
						<Indicators />
					</Carousel>
					
				</div>
			{:else}
				<p>Loading images...</p>
			{/if}

			<div class="modelDescription whitespace-pre-wrap">
				{model_data.description}
			</div>
		</div>
		<div class="modelStats flex flex-col gap-2">
			<div class="dlButtons flex items-center gap-2">
				<a href={versions[0].torrent_file_url}><Button color="green">Download torrent</Button></a>
				<a href={versions[0].magnet_link}
					><Button color="alternative"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-magnet"
							><path
								d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"
							/><path d="m5 8 4 4" /><path d="m12 15 4 4" /></svg
						></Button
					></a
				>
				<Button color="red"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-heart"
						><path
							d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
						/></svg
					></Button
				>
			</div>
			<div class="UserCard">
				<UserCard model={model_data} {supabase}/>
			</div>
			<div class="detailCard"><ModelDetails {model_data} {versions} /></div>
			<div class="fileList"><ModelFiles {model_data} {versions} /></div>
		</div>
	</div>
</div>
