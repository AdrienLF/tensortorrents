<div class="model-form">
    <h2>Create your model</h2>
  
    <label for="name">Name *</label>
    <input type="text" id="name" placeholder="Name">
  
    <label for="type">Type *</label>
    <select id="type">
      <option value="checkpoint">Checkpoint</option>
      <!-- Other options -->
    </select>
  
    <label for="checkpoint-type">Checkpoint Type *</label>
    <select id="checkpoint-type">
      <option value="trained">Trained</option>
      <option value="merge">Merge</option>
      <!-- Other options -->
    </select>
  
    <label for="category">Category *</label>
    <select id="category">
      <!-- Category options -->
    </select>
  
    <label for="tags">Tags</label>
    <!-- Tagging functionality would be implemented here -->
  
    <label for="about-your-model">About your model</label>
    <textarea id="about-your-model" placeholder="Tell us what your model does"></textarea>
  
    <!-- <button type="submit">Create Model</button> -->
  </div>


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
    .model-form input[type='text'], .model-form select {
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
  </style>