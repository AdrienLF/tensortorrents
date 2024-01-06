<script>
	import { Card, Listgroup, Avatar } from 'flowbite-svelte';
	let list = [
		{
			img: {
				src: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8134e671-a860-46ad-0400-1fc83e4f7200/width=96/8134e671-a860-46ad-0400-1fc83e4f7200.jpeg',
				alt: 'Neil Sims'
			},
			name: 'Neil Sims',
			email: 'email$libwindster.com',
			value: '$320'
		}
	];
</script>

<Card padding="md">
	<Listgroup items={list} let:item class="border-0 dark:!bg-transparent">
		<div class="flex items-center space-x-4 rtl:space-x-reverse">
			<Avatar src={item.img.src} alt={item.img.alt} class="flex-shrink-0" />
			<div class="min-w-0 flex-1">
				<p class="truncate text-sm font-medium text-gray-900 dark:text-white">
					{item.name}
				</p>
				<p class="truncate text-sm text-gray-500 dark:text-gray-400">Joined Mar 12, 2023</p>
			</div>
		</div>
	</Listgroup>
</Card>
