export function validateFiles(fileList) {
    const validExtensions = ['.safetensor', '.json', '.jpg', '.jpeg', '.png', '.gif', '.bmp'];
  
    fileList.forEach(file => {
      const fileExtension = file.path.slice(file.path.lastIndexOf('.')).toLowerCase();
      if (!validExtensions.includes(fileExtension)) {
        throw new Error(`Invalid file type: ${file.path}
Your torrent file should only contain safetensor files, json or images.` );
      }
    });
  }