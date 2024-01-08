<script>
    import { onMount } from 'svelte';

    let albumImages = [];
    let albumHash = 'P7wwBUf'; // Replace with your album hash

    onMount(async () => {
        const response = await fetch(`/getAlbumImages?albumHash=${albumHash}`);
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            
            albumImages = data;
        }
    });
</script>

<main>
    {#if albumImages.length > 0}
        <div class="gallery">
            {#each albumImages as image}
                <img src={image.link} alt={image.title || 'Image from Imgur'} />
            {/each}
        </div>
    {:else}
        <p>Loading images...</p>
    {/if}
</main>

<style>
    .gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .gallery img {
        max-width: 100%;
        height: auto;
        border: 1px solid #ccc;
    }
</style>
