<script>
	import { onMount } from 'svelte';

	import { Card } from 'flowbite-svelte';
	import { getRatingForVersion } from '$lib/utils/database/get_ratings';
	import { updateRatingInDatabase } from '$lib/utils/database/update_rating';

	export let supabase;
	export let model_data;
	export let versions;
	export let session;

	let rating = 0;
	let maxRating = 5;
	let modelId = 1; // Example model ID, change as per your application logic
	let stars = [];
	let versionId;
	let averageRating;
	let totalVotes;
	console.log(session);
	console.log(versions);

	//TODO: get rating info

	onMount(async () => {
		stars = Array(maxRating).fill(false);
		({versionId, averageRating, totalVotes} = await getRatingForVersion(versions[0].version_id));
		console.log(versionId, averageRating, totalVotes);
	});

	async function setRating(index) {
		console.log(index);
		rating = index + 1;
		updateRating(rating);
	}

	async function updateRating(newRating) {
		console.log(newRating, session.user.id, versions[0].version_id);
		let error = updateRatingInDatabase(session.user.id, versions[0].version_id, newRating);
		if (error) console.error(error);
		else console.log('Rating updated');
	}
</script>

<Card padding="md">
	<div class="flex flex-col gap-2 border-0 dark:!bg-transparent">
    <div class="flex flex-row gap-2">
		<div class="text-gray-500 dark:text-gray-200 font-bold">RATING</div><div>{totalVotes} ratings on this version</div>
  </div>
		<div class="flex flex-row gap-2 items-baseline" >
			{#each stars as _, index}
				<span class="cursor-pointer" on:click={() => setRating(index)}>
					{rating > index ? '★' : '☆'}
				</span>
			{/each}
      <div>
        {averageRating} out of 5
      </div>
		</div>
	</div>
</Card>

<style>
	span {
		color: gold;
		font-size: 24px;
	}
</style>
