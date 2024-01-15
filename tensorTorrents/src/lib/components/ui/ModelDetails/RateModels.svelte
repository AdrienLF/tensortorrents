<script>
	import { onMount } from 'svelte';

	import { Card } from 'flowbite-svelte';
	import { getRatingForVersion } from '$lib/utils/database/get_ratings';
	import { updateRatingInDatabase } from '$lib/utils/database/update_rating';

	export let supabase;
	export let model_data;
	export let versions;
  export let session

	let rating = 0;
	let maxRating = 5;
	let modelId = 1; // Example model ID, change as per your application logic
	let stars = [];
	let versionId;
	let averageRating;
	let totalVotes;
  console.log(session)
  console.log(versions)

	//TODO: get rating info

	onMount(() => {
		stars = Array(maxRating).fill(false);
    ({ versionId, averageRating, totalVotes } = getRatingForVersion(versions[0].id));
	});

	async function setRating(index) {
    console.log(index)
		rating = index + 1;
		updateRating(rating);
	}

	async function updateRating(newRating) {
    console.log(newRating, session.user.id, versions[0].version_id)
		let error = updateRatingInDatabase(session.user.id, versions[0].version_id, newRating);
		if (error) console.error(error);
		else console.log('Rating updated');
	}
</script>

<Card padding="md">
	<div class="border-0 dark:!bg-transparent">
		RATING
		{#each stars as _, index}
			<span class="cursor-pointer" on:click={() => setRating(index)}>
				{rating > index ? '★' : '☆'}
			</span>
		{/each}
	</div>
</Card>

<style>
	span {
		color: gold;
		font-size: 24px;
	}
</style>
