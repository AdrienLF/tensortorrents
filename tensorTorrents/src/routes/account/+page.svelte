<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
    import Avatar from './Avatar.svelte'
	export let data
	export let form

	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)

	let profileForm: HTMLFormElement
	let loading = false
	let fullName: string = profile?.full_name ?? ''
	let username: string = profile?.username ?? ''
	let website: string = profile?.website ?? ''
	let avatarUrl: string = profile?.avatar_url ?? ''

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
		}
	}

	const handleSignOut: SubmitFunction = () => {
		loading = true
		return async ({ update }) => {
			loading = false
			update()
		}
	}
</script>
<div class="form-widget container mx-auto">
    <form
      class="form-widget "
      method="post"
      action="?/update"
      use:enhance={handleSubmit}
      bind:this={profileForm}
    >

    <Avatar
    {supabase}
    bind:url={avatarUrl}
    size={10}
    on:upload={() => {
      profileForm.requestSubmit();
    }}
  />
  
    <div class="mb-4">
      <label for="email" class="block text-sm font-bold mb-2">Email</label>
      <input id="email" type="text" value={session.user.email} disabled class="text-gray-700 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div class="mb-4">
      <label for="fullName" class="block text-sm font-bold mb-2">Full Name</label>
      <input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} class="text-gray-700 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div class="mb-4">
      <label for="username" class="block text-sm font-bold mb-2">Username</label>
      <input id="username" name="username" type="text" value={form?.username ?? username} class="text-gray-700 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div class="mb-4">
      <label for="website" class="block text-sm font-bold mb-2">Website</label>
      <input id="website" name="website" type="url" value={form?.website ?? website} class="text-gray-700 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
    </div>

    <div class="mb-6">
      <input
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        value={loading ? 'Loading...' : 'Update'}
        disabled={loading}
      />
    </div>
  </form>

  <form method="post" action="?/signout" use:enhance={handleSignOut}>
    <div>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading}>Sign Out</button>
    </div>
  </form>
</div>
