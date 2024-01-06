<script>
	import { Button, Rating, AdvancedRating, ScoreRating } from 'flowbite-svelte';
	import Carousel from '@/components/ui/Gallery/Carousel.svelte';
	
	import UserCard from '@/components/ui/Cards/UserCard.svelte';
    import ModelDetails from '@/components/ui/ModelDetails/ModelDetails.svelte';
    import ModelFiles from '@/components/ui/ModelDetails/ModelFiles.svelte';
</script>

<div class="container mx-auto py-4">
	<div class="modelHeader">
		<div class="modelInfo flex flex-row items-center">
			<div class="modelName font-medium text-xl">Juggernaut XL</div>
			<Rating id="example-1b" total={5} size={25} rating={4.66} />
		</div>
		<div class="uploadInfo flex flex-row items-center gap-2">
			<div class="uploadDate text-xs">Updated: Dec 30, 2023</div>
            |
			<div class="tags flex flex-row gap-2 py-2">
				<Button color="light" size="xs" class="modelCategory">Base Model</Button>
                |
				<div class="modelTags flex flex-row gap-2">
					<Button color="alternative" size="xs" class="modelTag">Photorealistic</Button>
					<Button color="alternative" size="xs" class="modelTag">Photo</Button>
				</div>
			</div>
		</div>
		<div class="modelVersions flex flex-row gap-2 py-2">
			<Button color="alternative" active size="xs" class="modelVersionName" >V7 + Rundiffusion</Button>
            <Button color="alternative" size="xs" class="modelVersionName" >V6 + Rundiffusion</Button>
		</div>
	</div>

	<div class="modelContent flex flew-row gap-12">
		<div class="modelPreview">
			<Carousel />
			<div class="modelDescription whitespace-pre-wrap">
				For business inquires, commercial licensing, custom models, and consultation contact me under juggernaut@rundiffusion.com

Update:
Try out the Inpaint Version for V7 from Sevenof9247

Here I am again ;)

Before diving back into the details, I want to express a huge thank you to all of you. Over 40k downloads for Version 6 alone is absolutely amazing. It was a great pleasure to see your images in the gallery, and I hope the excitement continues seamlessly with Version 7 :)

A big thanks for Version 7 goes to RunDiffusion (Photo Model) and Adam, who diligently helped me test :) (Leave some love for them ;) )

For Version 7, I've slightly reduced the RunDiffusion Photo Model (from 0.35 to 0.3) and added a new Cinematic Set with 120k training steps. Additionally, I tinkered with some small details. Version 7 doesn't differ greatly from Version 6 but, thanks to its new update, it has significantly increased contrast (there were a few complaints about the desaturated look), and the lighting conditions appear somewhat more natural.


			</div>
		</div>
		<div class="modelStats flex flex-col gap-2">
            
			<div class="dlButtons flex items-center gap-2">
				<Button color="green">Download torrent</Button>
				<Button color="alternative"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-magnet"><path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"/><path d="m5 8 4 4"/><path d="m12 15 4 4"/></svg></Button>
				<Button color="red"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></Button>
			</div>
            <div class="UserCard">
				<UserCard />
			</div>
			<div class="detailCard"><ModelDetails/></div>
			<div class="fileList"><ModelFiles /></div>
			
		</div>
	</div>
</div>
