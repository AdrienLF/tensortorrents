import bencode from 'bencode';

function arrayBufferToHexString(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

export async function generateMagnetLink(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async function (e) {
            try {
                const torrent = bencode.decode(new Uint8Array(e.target.result));
                const encodedInfo = bencode.encode(torrent.info);
                const hashBuffer = await crypto.subtle.digest('SHA-1', encodedInfo);
                const infoHash = arrayBufferToHexString(hashBuffer);

                let params = `xt=urn:btih:${infoHash}`;

                if ('length' in torrent.info) {
                    params += `&xl=${torrent.info.length}`;
                }
                if ('name' in torrent.info) {
                    params += `&dn=${encodeURIComponent(torrent.info.name.toString('utf-8'))}`;
                }
                if ('announce' in torrent) {
                    params += `&tr=${encodeURIComponent(torrent.announce.toString('utf-8'))}`;
                }
                if ('announce-list' in torrent && Array.isArray(torrent['announce-list'])) {
                    torrent['announce-list'].forEach(ann => {
                        params += `&tr=${encodeURIComponent(ann.toString('utf-8'))}`;
                    });
                }

                const magnetLink = `magnet:?${params}`;
                resolve(magnetLink);
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
