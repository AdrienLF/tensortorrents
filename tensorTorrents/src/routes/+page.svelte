<script>
	import FilterMenu from '$lib/components/ui/FilterMenu.svelte';
	import MasonGallery from '$lib/components/ui/Gallery/MasonGallery.svelte';
	export let data

	const models = data.props.models
</script>

<FilterMenu />
<div class="container mx-auto flex-auto justify-evenly p-8">
	<MasonGallery {models}/>
</div>
