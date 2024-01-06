
<script>
    import { Toggle } from "flowbite-svelte";
  </script>
  
  
  <div class="version-form">
    <h2>Add version</h2>
  
    <label for="version-name">Name *</label>
    <input type="text" id="version-name" placeholder="v1.0">
  
    <label for="early-access">Early Access</label>
    <!-- Implementation for the early access toggle would go here -->
  
    <label for="base-model">Base Model *</label>
    <select id="base-model">
      <option value="SD 1.5">SD 1.5</option>
      <!-- Other options -->
    </select>
  
    <label for="base-model-type">Base Model Type</label>
    <select id="base-model-type">
      <option value="standard">Standard</option>
      <!-- Other options -->
    </select>
  
    <label for="version-changes">Version changes or notes</label>
    <div class="note-editor-toolbar">
      <!-- Toolbar buttons for text editing -->
    </div>
    <textarea id="version-changes" placeholder="Tell us about this version"></textarea>
  
    <label for="trigger-words">Trigger Words *</label>
    <input type="text" id="trigger-words" placeholder="e.g., Master Chief">
  
    <div class="toggle-button flex flew-row"> <Toggle />This version doesn't require any trigger words</div>
  
    <!-- <button type="submit">Add Version</button> -->
  </div>
  
  <style>
    /* General styling for the form container */
    .version-form {
      max-width: 600px;
      margin: auto;
      
      padding: 2em;
      border-radius: 10px;
      color: #fff;
    }
  
    /* Style for the input fields and select dropdown */
    .version-form input[type='text'], .version-form select, .version-form textarea {
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
  </style>