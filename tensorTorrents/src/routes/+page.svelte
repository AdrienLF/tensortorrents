<script>
	import FilterMenu from '$lib/components/ui/FilterMenu.svelte';
	import { onMount } from 'svelte';
	import ModelCard from '$lib/components/ui/Gallery/ModelCard.svelte';
	import { Pagination, PaginationItem } from 'flowbite-svelte';
	import { ArrowLeftSolid, ArrowRightSolid } from 'flowbite-svelte-icons';
	import { Heading, Card } from 'flowbite-svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase } = data);

	let pages = [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }];

	let models = data.props.models;
	console.log(models);

	let currentPage = 1;
	let itemsPerPage = 20;

	async function loadModels(page) {
		try {
			const response = await fetch(`/api/get_models?page=${page}&itemsPerPage=${itemsPerPage}`);

			console.log(response);
			if (response.ok) {
				models = await response.json();
			} else {
				console.error('Failed to load images:', response.status, response.statusText);
			}
		} catch (e) {
			console.error('Error fetching images:', e.message);
		}
		console.log(models);
	}

	onMount(async () => {
		loadModels(currentPage);
	});

	function goToNextPage() {
		console.log(next);
		currentPage += 1;
		loadModels(currentPage);
	}

	function goToPreviousPage() {
		if (currentPage > 1) {
			currentPage -= 1;
			loadModels(currentPage);
		}
	}
</script>

<div class="moto container flex p-2 items-center justify-center">
	<Card size="l">
		<Heading tag="h6"
			>Open source also means open distribution. </Heading
			>
			TensorTorrents was created in fear of amazing models disappearing.
			<br>
			To make sure models will be available to
			everyone in a sustainable way, we only use a torrent distribution model. <strong> Power to the creators,
			not the financiers.</strong>
	</Card>
</div>

<!-- <FilterMenu /> -->
<div class="models container">
	{#if models}
		<div
			class="container mx-auto flex-auto columns-1 justify-evenly gap-5 p-8 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>.modelCard:not(:first-child)]:mt-8"
		>
			{#each models as model, index}
				<ModelCard {model} {index} {supabase} />
			{/each}
		</div>
	{/if}
	<div class="flex space-x-3 rtl:space-x-reverse">
		<PaginationItem large class="flex items-center" on:click={goToPreviousPage}>
			<ArrowLeftSolid class="me-2 h-5 w-5" />
			Previous
		</PaginationItem>
		<PaginationItem large class="flex items-center" on:click={goToNextPage}>
			Next
			<ArrowRightSolid class="ms-2 h-5 w-5" />
		</PaginationItem>
	</div>
</div>

<style>
	.models {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
