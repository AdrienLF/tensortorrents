<script lang="ts">
	import { Card, Listgroup, Avatar } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { formatIsoDateString } from '$lib/utils/formatISOstrings';
	import { UserCircleOutline } from 'flowbite-svelte-icons';

	export let model;

	console.log(model);

	
</script>

{#if model.owner}
	<Card padding="md">
		<Listgroup class="border-0 dark:!bg-transparent">
			<div class="flex items-center space-x-4 rtl:space-x-reverse">
				<Avatar src={model.owner.avatar_url} class="flex-shrink-0" />
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-gray-900 dark:text-white">
						{model.owner.username}
					</p>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						Joined {formatIsoDateString(model.owner.created_at)}
					</p>
				</div>
			</div>
		</Listgroup>
	</Card>
{:else}
	<Card padding="md">
		<Listgroup class="border-0 dark:!bg-transparent">
			<div class="flex items-center space-x-4 rtl:space-x-reverse">
				<div class="min-w-0 flex-1">
					<p
						class=" flex flex-row gap-2 truncate text-sm font-medium text-gray-900 dark:text-white"
					>
						<UserCircleOutline></UserCircleOutline>Anonymous
					</p>
				</div>
			</div>
		</Listgroup>
	</Card>
{/if}
