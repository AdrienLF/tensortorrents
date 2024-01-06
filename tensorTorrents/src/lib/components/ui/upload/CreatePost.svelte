
<script>
    // Import the necessary Flowbite components if needed
    // import { FileInput } from 'flowbite-svelte'
  </script>
  
  <style>
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
  </style>
  
  <div class="file-upload-container">
    <h2>Create your post</h2>
  
    <!-- Flowbite File Input Component Example (uncomment if Flowbite-Svelte is installed) -->
    <!--
    <FileInput multiple="true" accept=".png,.jpeg,.jpg,.webp,.mp4,.webm" />
    -->
    
    <!-- Placeholder for the FileInput if Flowbite-Svelte is not installed -->
    <div class="upload-instructions">
      <span>Drag images here or click to select files</span>
      <br>
      <!-- Display an icon or an image here if needed -->
    </div>
  
    <div class="file-limits">
      Attach up to 20 files
      <br>
      Accepted file types: .png, .jpeg, .jpg, .webp, .mp4, .webm
      <br>
      Images cannot exceed 50 MB
      <br>
      Videos cannot exceed 4k resolution or 120 seconds in duration
    </div>
  </div>
  