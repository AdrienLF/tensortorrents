<script>
	import '../app.css';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
</script>

<Navbar />
<slot />
<Footer />
