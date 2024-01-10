<script>
    import { AccordionItem, Accordion } from 'flowbite-svelte';
  </script>
  
  <Accordion flush>
    <AccordionItem>
      <span slot="header">What is TensorTorrents?
    </span>
      <p class="mb-2 text-gray-500 dark:text-gray-400">TensorTorrents is an open-source platform similar to CivitAI, designed to enhance user experience in sharing and downloading content. Our unique feature is the integration of torrent technology, enabling efficient and decentralized file sharing.</p>
    </AccordionItem>
    <AccordionItem>
      <span slot="header">Why create an alternative to Civitai?</span>
      <p class="mb-2 text-gray-500 dark:text-gray-400">Alternatives are good! We love Civitai, however their model of keeping in their servers all the models is unsustainable. GenAI, and especially stable diffusion, was built on open source, on sharing, and we believe torrents are the best way to upload and share models. Instead of using costly servers that WE control, we let the community have control on the distribution.</p>
    </AccordionItem>
    <AccordionItem>
        <span slot="header">Is tensortorrents free?</span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">Yes, yes, and yes. Tensortorrents was created in the fear that open source genAI becoming a pay-to-play hobby. We built the site so that it costs as little as possible to run, and we pledge to always keep the website free for users. No paywalls, for anything, ever.</p>
      </AccordionItem>
    <AccordionItem>
        <span slot="header">Do I have to be logged in to upload torrents, or download them?</span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">You don't! We aim to be as user friendly as possible, therefore anyone can upload of download any torrent file.</p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header">Is using torrents hard?</span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">Not at all! Using torrents is very easy. To create a torrent, just go to your favorite torrent application (transmission, qbittorrent, etc) and select "create torrent". To download torrent, just open the torrent file in your favorite application.</p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header">Are torrents illegal?</span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">Torrents are perfectly legal. We ask users to only provide with tensor models in safetensor format, and to not upload anything illegal. We cannot be held responsible for the acts of our users, where they to break our rules.</p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header">Does tensortorrents work with automatic1111, ComfyUI, Foocus, and other?</span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">Yes! Our goal is to facilitate the diffusion of checkpoints and other models for stable diffusion, therefore these models should work with the softwares you're used to.</p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header">Can tensortorrents fix bad hands?</span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">We can't, but we'll happily feature the models that will!</p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header">Can I upload LORA/QLORA, etc on tensortorrents?</span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">Every type of model/checkpoints/etc is welcome on tensortorrents as long as they don't break the law.</p>
      </AccordionItem>
  </Accordion>