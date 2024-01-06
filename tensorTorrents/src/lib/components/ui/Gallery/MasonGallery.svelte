<script>
    import { Gallery } from 'flowbite-svelte';
  import { Pagination, PaginationItem } from 'flowbite-svelte';


  let pages = [{ name: "1"}, { name: "2" }, { name: "3" }, { name: "4" }, { name: "5" }];
  const previous = () => {
    alert('Previous btn clicked. Make a call to your server to fetch data.');
  };
  const next = () => {
    alert('Next btn clicked. Make a call to your server to fetch data.');
  };
  const handleClick = () => {
    alert('Page clicked');
  };



    const images = [[
    { alt: 'shoes', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg' },
    { alt: 'small bag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg' },
    { alt: 'plants', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg' },
    { alt: 'watch', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg' },
    { alt: 'shoe', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg' }
  ], 
  [
    { alt: 'watch', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg' },
    { alt: 'shoe', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg' },
    { alt: 'shoes', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg' },
    { alt: 'small bag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg' },
    { alt: 'plants', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg' },
    
  ]];
  </script>
  
  <Gallery class="gap-4 grid-cols-2 md:grid-cols-4" items={images} let:item>
   {#each images as item}
   <a href="/models/1" class="gap-4">
  <Gallery items={item} />
</a>
   {/each}
   
  </Gallery>

  <div class="paginationContainer flex justify-evenly py-4">
  <Pagination {pages} on:previous={previous} on:next={next} on:click={handleClick} />

</div>