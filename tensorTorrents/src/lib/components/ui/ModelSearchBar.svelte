<script lang="ts">
	import { onMount } from 'svelte';
	import { Input } from 'flowbite-svelte';
	import type { ModelData } from '$lib/types/ModelData';
	import { Rating } from 'flowbite-svelte';
    import { UserCircleOutline } from 'flowbite-svelte-icons';
    

	let results: ModelData[] ;
	let query = '';
    


	async function search_model(event) {
		console.log(event);
		console.log(query);
		try {
			const response = await fetch(`/api/search_model_by_name?query=${query}`);

			console.log(response);
			if (response.ok) {
				results = await response.json();
			} else {
				console.error('Failed to load images:', response.status, response.statusText);
			}
		} catch (e) {
			console.error('Error fetching images:', e.message);
		}
		console.log(results);
	}
</script>

<Input
	bind:value={query}
	id="search-navbar"
	class="ps-10"
	placeholder="Search..."
	on:change={search_model}
/>

{#if results }

<div class='resultsPreview'>
{#each results as result}
	<div class="profile-card items-center justify-center">
		<div class="modelPreview">
			<img src={result.preview_img_url ? result.preview_img_url : ""} alt="Model Preview" />
		</div>
		<div class="modelInfo flew flex-row">
			<div class="modelName">{result.name}</div>
			<div class="ownerBadges flew-col flex gap-2 py-2 align-middle items-center">
                {#if result.owner}
                <div class="OwnerInfo flex flex-grow flex-row gap-1 align-middle items-center">
					<img src={downloadImage(result.owner.avatar_url)} alt="User Avatar" class="userAvatar"/>
					
                    <div>{result.owner.username}</div>
				</div>
                {:else}
                <div class="OwnerInfo flex align-middle items-center flex-grow flex-row gap-1">
					<UserCircleOutline />
					
                    <div>Anonymous</div>
				</div>
                {/if}
				
				<!-- Include badges here -->
				<div class="badges gap-2">
					<span>{result.modeltypes.name}</span>
					<span>{result.checkpoint_type}</span>
				</div>
			</div>
			<!-- Stats like stars, likes, etc. -->
			<div class="stats ">
				<Rating size="20" rating={result.rating} />
			</div>
		</div>
	</div>
{/each}

</div>
{/if}
<style>

    .resultsPreview {
        background-color: #222;
        position:relative;
        top:100Px;
        border: 1px solid #333;
        border-radius: 8px;
        width: fit-content;
        padding:1em;
        
    }

	.profile-card {
		font-family: var(--default-font);
		display: flex;
		flex-direction: row;
        border-radius: 4px;
        

	}
    .resultsPreview :hover {
		background-color: #333;

	}

    .userAvatar {
        height: 20px;
		width: 20px;
		object-fit: contain;
        
    }

	.modelPreview {
		height: 80px;
		width: 80px;
		object-fit: contain;
        overflow: hidden;
        margin:1em 1em;
	}

	.ownerBadges {
		font-size: 8px;
		font-weight: 500;
	}
	.modelName {
		font-weight: 700;
		font-size: 14px;
	}

	.badges {
		/* Add styles for badges */
	}
	.stats {
		/* Add styles for stats */
	}
</style>
