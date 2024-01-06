<script>
	import { Dropzone, Listgroup, ListgroupItem, Button, Dropdown } from 'flowbite-svelte';

	let files = []; // This will hold the files added by the user

	let value = [];
	const dropHandle = (event) => {
        console.log(event)
		value = [];
		event.preventDefault();
		if (event.dataTransfer.items) {
			[...event.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					value.push(file.name);
					value = value;
				}
			});
		} else {
			[...event.dataTransfer.files].forEach((file, i) => {
				value = file.name;
			});
		}
	};

	const handleChange = (event) => {
		const files = event.target.files;
		if (files.length > 0) {
			value.push(files[0].name);
			value = value;
		}
	};

	const showFiles = (files) => {
		if (files.length === 1) return files[0];
		let concat = '';
		files.map((file) => {
			concat += file;
			concat += ',';
			concat += ' ';
		});

		if (concat.length > 40) concat = concat.slice(0, 40);
		concat += '...';
		return concat;
	};

	// Function to handle file selection (to be implemented)
	function handleFiles(event) {
		console.log(event);
		const selectedFiles = Array.from(event.detail.files);
		// Logic to add files to the `files` array, for example:
		files = [...files, ...selectedFiles];
		console.log(files);
	}

	// Function to remove a file from the list (to be implemented)
	function removeFile(fileIndex) {
		files.splice(fileIndex, 1);
		files = [...files]; // Trigger reactivity
	}

	// Function to start the upload process (to be implemented)
	function startUpload() {
		// Upload logic here
	}
</script>

<div>
	<h2>Upload files</h2>
	<Dropzone
		on:drop={dropHandle}
		on:dragover={(event) => {
			event.preventDefault();
		}}
		on:change={handleChange}
		accept=".ckpt,.pt,.safetensors,.bin,.zip,.yaml,.yml,.onnx"
		multiple
		maxFiles={11}
		maxSize={50 * 1024 * 1024}
		<!--
		Example
		size
		limit:
		50MB
		per
		file
		--
	>
		>
		<p>Drop your files here or click to select</p>
		<p class="text-sm text-gray-500">
			Attach up to 11 files. Accepted file types: .ckpt, .pt, .safetensors, .bin, .zip, .yaml, .yml,
			.onnx
		</p>
	</Dropzone>

	<Button on:click={startUpload}>Start Upload</Button>

	<Listgroup>
		{#each files as file, index}
			<ListgroupItem>
				<span>{file.name}</span>
				<Dropdown let:item>
					<Button slot="trigger" outline size="sm">{file.type || 'Select type'}</Button>
					<Listgroup>
						<!-- Dropdown items for selecting file type -->
						<ListgroupItem on:click={() => selectFileType(index, 'Config')}>Config</ListgroupItem>
						<!-- Add more options here -->
					</Listgroup>
				</Dropdown>
				<Button on:click={() => removeFile(index)} color="failure" outline size="sm">🗑️</Button>
			</ListgroupItem>
		{/each}
	</Listgroup>
</div>

<style>
	/* Additional custom styles can be added here if needed */
</style>
