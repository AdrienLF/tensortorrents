<script lang="ts">
	import { Dropzone, Listgroup, ListgroupItem, Button, Dropdown, Toggle } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import { generateMagnetLink } from '$lib/utils/generateMagnetlink.js';
	import { extractFilesFromTorrent } from '$lib/utils/get_files_from_torrent.js';
	export let data;

	let { supabase, session } = data
  $: ({ supabase, session } = data)
  console.log(session)

  const user_id = session?.user.id

	const basemodels = data.props.basemodels;
	const modeltypes = data.props.modeltypes;
	console.log(data.props.basemodels);

	let value = [];

	const dropHandle = (event) => {
		console.log(event);
		value = [];
		event.preventDefault();
		let file = event.dataTransfer.files;
		console.log(file);
		uploadTorrent(file, data.supabase);
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
		console.log(event);
		const files = event.target.files;
		if (files.length > 0) {
			value.push(files[0].name);
			value = value;
		}
		uploadTorrent(files, data.supabase);
	};

	const showFiles = (files) => {
		console.log(files);
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

	function handleToggleChange(e, hiddenInputId) {
		const toggleValue = e.target.checked; // true or false
		document.getElementById(hiddenInputId).value = toggleValue.toString(); // Convert boolean to string
	}

	export let size = 10;
	export let url: string;

	let uploading = false;
	let torrent_URL: string;

	let magnet_link: string;
	const dispatch = createEventDispatcher();

	const getTorrentUrl = async (path: string, supabase) => {
		try {
			const { data, error } = await supabase.storage.from('torrent_files').getPublicUrl(path);
			console.log(data);
			console.log(error);
			if (error) {
				throw error;
			}

			const url = data.publicUrl;
			torrent_URL = url;
			console.log(torrent_URL);
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading torrent: ', error.message);
			}
		}
	};

	const uploadTorrent = async (files, supabase) => {
		try {
			console.log(files);
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];

			extractFilesFromTorrent(file)
				.then((files) => console.log(files))
				.catch((error) => console.error(error));

			magnet_link = await generateMagnetLink(file);
			console.log(magnet_link);
			const filename = file.name.split('.')[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${filename}${Math.random()}.${fileExt}`;
			console.log(file);
			console.log(fileExt);
			console.log(filePath);

			const { data, error } = await supabase.storage.from('torrent_files').upload(filePath, file);
			console.log(data);
			console.log(error);

			getTorrentUrl(filePath, supabase);

			if (error) {
				throw error;
			}

			url = filePath;
			console.log(url);
			setTimeout(() => {
				dispatch('upload');
			}, 100);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: {
		console.log(value);
	}

	let selectedModelTypeId;
	let isTrained = true;
	let isChecked = true;

	$: showCheckpointType = modeltypes.find((m) => m.type_id === selectedModelTypeId)?.type_id === 1;
</script>

<form method="POST" action="?/submit_torrent" use:enhance>

	<input type="hidden" name="owner" id="owner" value={user_id} />
	<div class="model-form">
		<h2>Create your model</h2>
		<label for="name">Name *</label>
		<input name="name" type="text" id="name" placeholder="Name" required />

		<label for="imgur_link">Preview images URL *</label>
		<input name="imgur_link" type="text" id="imgur_link" placeholder="Imgur link" />

		<label for="type">Type *</label>
		<div class=" flex flex-row gap-4">
			<select bind:value={selectedModelTypeId} id="type" name="type" required>
				{#each modeltypes as modeltype}
					<option value={modeltype.type_id}>{modeltype.name}</option>
				{/each}
			</select>
			{#if showCheckpointType}
				<!-- Render checkpoint type here -->
				<!-- <label for="checkpoint-type">Checkpoint Type *</label>
		<select id="checkpoint-type" name="checkpoint-type">
		<option value="trained">Trained</option>
		<option value="merge">Merge</option>
			</select> -->

				<div class="toggle-container">
					<div class="toggle-btn {isChecked ? 'active' : ''}" on:click={() => (isChecked = true)}>
						Trained
					</div>
					<div class="toggle-btn {!isChecked ? 'active' : ''}" on:click={() => (isChecked = false)}>
						Merge
					</div>
				</div>

				<!-- You can use isChecked to determine what to submit in your form -->
				<input type="hidden" name="checkpoint_type" value={isChecked ? 'Trained' : 'Merge'} />
			{/if}
		</div>
		<label for="category">Category *</label>
		<select name="category" id="category">
			<option value="Character">Character</option>
			<option value="Style">Style</option>
			<!-- Category options -->
		</select>

		<label for="about-your-model">About your model *</label>
		<textarea
			name="description"
			id="about-your-model"
			placeholder="Tell us what your model does"
			required
		></textarea>

		<!-- Additional form fields can be added here -->
	</div>

	<div class="version-form">
		<h2>Add version</h2>

		<label for="version-name">Name *</label>
		<input type="text" id="version-name" name="version-name" placeholder="v1.0" required />

		<label for="early-access">Early Access</label>
		<Toggle id="earlyAccess" on:change={(e) => handleToggleChange(e, 'earlyAccessValue')} />
		<input type="hidden" name="earlyAccess" id="earlyAccessValue" value="false" />

		<label for="base-model">Base Model *</label>
		<select name="base-model" id="base-model" required>
			{#each basemodels as baseModel}
				<option value={baseModel.base_model_id}>{baseModel.name}</option>
			{/each}
			<!-- Other options -->
		</select>

		<label for="version-changes">Version changes or notes</label>
		<div class="note-editor-toolbar">
			<!-- Toolbar buttons for text editing -->
		</div>
		<textarea name="version-changes" id="version-changes" placeholder="Tell us about this version"
		></textarea>

		<label for="trigger-words">Trigger Words</label>
		<input name="trigger-words" id="trigger-words" type="text" placeholder="e.g., Master Chief" />

		<div class="toggle-button flex flex-row">
			<Toggle id="trigger_bool" on:change={(e) => handleToggleChange(e, 'trigger_boolValue')} />This
			version doesn't require any trigger words

			<input type="hidden" name="trigger_bool" id="trigger_boolValue" value="false" />
		</div>

		<!-- Additional form fields can be added here -->
	</div>

	<div class="container max-w-[600px]">
		<h2>Upload torrent file.</h2>
		<Dropzone
			id="dropzone"
			on:drop={dropHandle}
			on:dragover={(event) => {
				event.preventDefault();
			}}
			on:change={handleChange}
		>
			<svg
				aria-hidden="true"
				class="mb-3 h-10 w-10 text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/></svg
			>
			{#if value.length === 0}
				<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span class="font-semibold">Click to upload</span> or drag and drop
				</p>
				<p class="text-xs text-gray-500 dark:text-gray-400">Drag your torrent file here.</p>
			{:else}
				<p>{showFiles(value)}</p>
			{/if}
		</Dropzone>

		<Listgroup>
			{#each value as file, index}
				<ListgroupItem>
					<span class="whitespace-pre-wrap">{file}</span>
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

		<button
			formaction="?/submit_torrent"
			class="my-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>Submit</button
		>
		<input type="hidden" name="torrent_url" bind:value={torrent_URL} />
		<input type="hidden" name="magnet_link" bind:value={magnet_link} />
	</div>
</form>

<style>
	/* General styling */
	.model-form {
		max-width: 600px;
		margin: auto;
		padding: 2em;
		border-radius: 10px;
		color: #fff;
	}

	/* Input field styling */
	.model-form input[type='text'],
	.model-form select {
		width: 100%;
		padding: 0.5em;
		margin: 0.5em 0;
		box-sizing: border-box;
		background: #222;
		border: none;
		color: #fff;
	}

	/* Label styling */
	.model-form label {
		display: block;
		margin: 0.5em 0 0.2em 0;
	}

	/* Button styling */
	.model-form button {
		padding: 0.5em 1em;
		color: #fff;
		background-color: #444;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 1em;
	}

	/* Button hover effect */
	.model-form button:hover {
		background-color: #555;
	}

	/* Textarea styling */
	.model-form textarea {
		width: 100%;
		height: 100px;
		padding: 0.5em;
		background: #222;
		border: none;
		color: #fff;
		margin: 0.5em 0;
	}

	/* General styling for the form container */
	.version-form {
		max-width: 600px;
		margin: auto;

		padding: 2em;
		border-radius: 10px;
		color: #fff;
	}

	/* Style for the input fields and select dropdown */
	.version-form input[type='text'],
	.version-form select,
	.version-form textarea {
		width: 100%;
		padding: 0.5em;
		margin: 0.5em 0;
		box-sizing: border-box;
		background: #222;
		border: none;
		color: #fff;
	}

	/* Toggle button style */
	.toggle-button {
		margin: 0.5em 0;
		border: none;
		color: #fff;
	}

	/* Style for labels */
	.version-form label {
		display: block;
		margin: 0.5em 0 0.2em 0;
	}

	/* Style for the submit button */
	.version-form button {
		padding: 0.5em 1em;
		color: #fff;
		background-color: #444;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 1em;
	}

	/* Submit button hover effect */
	.version-form button:hover {
		background-color: #555;
	}

	/* Styling for the note editor toolbar */
	.note-editor-toolbar {
		background: #222;
		border: none;
		color: #aaa;
		margin-bottom: 0.5em;
	}

	/* Specific styles for toolbar buttons */
	.note-editor-toolbar button {
		background: none;
		border: none;
		color: #aaa;
	}

	/* General styling for the file upload container */
	.file-upload-container {
		max-width: 800px;
		margin: auto;
		background: #333;
		padding: 2em;
		border-radius: 10px;
		border: 2px dashed #555;
		color: #fff;
		text-align: center;
	}

	/* Styling for the file upload instructions */
	.upload-instructions {
		margin-bottom: 1em;
	}

	/* Styling for file input limitations */
	.file-limits {
		color: #aaa;
		font-size: 0.9em;
		margin-top: 1em;
	}
	.toggle-container {
		display: flex;
		align-items: center;
		justify-content: space-between;

		border-radius: 4px;
		border: 1px solid #666;
		padding: 5px;
		width: 200px; /* Adjust the width as necessary */
	}

	.toggle-btn {
		flex: 1;
		text-align: center;
		padding: 10px 20px;
		user-select: none;
		cursor: pointer;
		color: #fff;
		transition: background-color 0.3s;
		border-radius: 4px;
	}

	.toggle-btn.active {
		background-color: #06f; /* Adjust active color */
	}
</style>
