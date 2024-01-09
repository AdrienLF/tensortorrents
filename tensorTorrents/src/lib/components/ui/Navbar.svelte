<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import TensorTorrentsLogoV1 from './TensorTorrentsLogoV1.svelte';
	import UploadPlusButton from './UploadPlusButton.svelte';

	import { DarkMode } from 'flowbite-svelte';

	export let session
</script>

<Navbar>
	<NavBrand href="/">
		<span
			class="flex flex-row items-center justify-center gap-4 self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			><TensorTorrentsLogoV1 class_name="fill-gray-700 dark:fill-white" />
			<div class="uploadButton"><a href="/upload"><UploadPlusButton /></a></div></span
		>
	</NavBrand>
	<div class="md:order-0 flex">
		<Button
			color="none"
			data-collapse-toggle="mobile-menu-3"
			aria-controls="mobile-menu-3"
			aria-expanded="false"
			class="me-1 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
		>
			<SearchOutline class="h-5 w-5" />
		</Button>
		<div class="relative hidden md:block">
			<div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
				<SearchOutline class="h-4 w-4" />
			</div>
			<Input id="search-navbar" class="ps-10" placeholder="Search..." />
		</div>
		<NavHamburger />
	</div>
	<NavUl ulClass="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium items-center">
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/upload">Upload</NavLi>
		{#if session}
		<Button><NavLi href="/logout">Logout</NavLi></Button>
		{:else}
		<Button><NavLi href="/auth">Login</NavLi></Button>
		
		{/if}
		
	</NavUl>
	<DarkMode />
</Navbar>

<style>
	.uploadButton {
		cursor: pointer;
		height: 25px;
		width: 25px;
		border-radius: 5px;
		background-color: #529c4f;
	}

</style>
