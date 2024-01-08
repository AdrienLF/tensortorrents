import bencode from 'bencode';

export function extractFilesFromTorrent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const torrent = bencode.decode(new Uint8Array(e.target.result));
                const files = torrent.info.files 
                    ? torrent.info.files.map(f => ({
                        path: f.path.map(p => {
                            // Ensure p is an array of numbers before converting
                            if (Array.isArray(p)) {
                                return String.fromCharCode(...p);
                            } else {
                                throw new Error("Unexpected path format in torrent file");
                            }
                        }).join('/'),
                        length: f.length
                    }))
                    : [{ 
                        path: torrent.info.name ? String.fromCharCode(...torrent.info.name) : 'Unnamed file',
                        length: torrent.info.length 
                    }];

                resolve(files);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = function (e) {
            reject(e);
        };
        reader.readAsArrayBuffer(file);
    });
}