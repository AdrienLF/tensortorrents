<script lang="ts">
	import { Card, Listgroup, Avatar } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { formatIsoDateString } from '$lib/utils/formatISOstrings';

	export let model
	export let supabase

	let avatarUrl

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

	console.log(model)
	
	onMount(async () => {
		
			await downloadImage(model.owner.avatar_url);
		
	})
</script>

{#if model.owner}
<Card padding="md">
	<Listgroup class="border-0 dark:!bg-transparent">
		<div class="flex items-center space-x-4 rtl:space-x-reverse">
			<Avatar src={avatarUrl} class="flex-shrink-0" />
			<div class="min-w-0 flex-1">
				<p class="truncate text-sm font-medium text-gray-900 dark:text-white">
					{model.owner.username}
				</p>
				<p class="truncate text-sm text-gray-500 dark:text-gray-400">Joined {formatIsoDateString(model.owner.created_at)}</p>
			</div>
		</div>
	</Listgroup>
</Card>
{:else}
<Card padding="md">
	<Listgroup class="border-0 dark:!bg-transparent">
		<div class="flex items-center space-x-4 rtl:space-x-reverse">
			
			<div class="min-w-0 flex-1">
				<p class="truncate text-sm font-medium text-gray-900 dark:text-white">
			Anonymous
				</p>
				
			</div>
		</div>
	</Listgroup>
</Card>
{/if}

