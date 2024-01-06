<script>
    import { Carousel } from 'flowbite-svelte';
    // ./imageData/+server.js has the following
    export const images = [
      {
        alt: 'Cosmic timetraveler',
        src: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/15d52d5d-8887-4dd5-b8c3-8ade5c657d7d/width=450/00001-beautiful%20lady,%20(freckles),%20big%20smile,%20blue%20eyes,%20buzzcut%20hair,%20dark%20makeup,%20hyperdetailed%20photography,%20soft%20light,%20head%20and%20sho.jpeg',
        title: 'cosmic-timetraveler-pYyOZ8q7AII-unsplash.com'
      },
      {
        alt: 'Cristina Gottardi',
        src: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/29634cfe-a886-4a34-a2ec-ba27f5eb9fe9/width=450/00384-Bosch-style,%20a%20translucent%20cube%20traps%20eerie%20clouds,%20the%20starsscape%20warps,%20time%20distorts,%20surrealism%20reigns,%20stars,%20Glowing,%20spar.jpeg',
        title: 'cristina-gottardi-CSpjU6hYo_0-unsplash.com'
      },
      {
        alt: 'Johannes Plenio',
        src: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/06363423-901f-495c-a989-b61b98f036a1/width=450/00023-photograph%20close%20up%20portrait%20of%20Female%20boxer%20training,%20serious,%20stoic%20cinematic%204k%20epic%20detailed%204k%20epic%20detailed%20photograph%20sho.jpeg',
        title: 'johannes-plenio-RwHv7LgeC7s-unsplash.com'
      },
      {
        alt: 'Jonatan Pie',
        src: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/f5f27687-aaf0-4266-aa03-1024e9509301/width=450/00025-Architecture%20Photography,%20eiffel%20tower,%20azure%20and%20red%20tones,%20photo%204k,%20art%20work,%20bright%20day,%206%20k_.jpeg',
        title: 'jonatan-pie-3l3RwQdHRHg-unsplash.com'
      },
     
    ];
  </script>
  
  <div class="max-w-4xl ">
    <Carousel {images} duration="3000" />
  </div>