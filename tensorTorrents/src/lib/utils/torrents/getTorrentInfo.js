import parseTorrent from 'parse-torrent';
import { readFileSync } from 'fs';

function getTorrentSeedersAndLeechers(torrentPath) {
    // Read the torrent file
    const torrent = fs.readFileSync(torrentPath);

    // Parse the torrent file
    const parsed = parseTorrent(torrent);

    // At this point, you have the parsed torrent information
    // You would need to implement or use a library to query the tracker(s)
    // For each tracker URL in parsed.announce, you'd send a request and parse the response
    // This part is highly dependent on the tracker protocol (HTTP, UDP, DHT, etc.)

    console.log("Parsed Torrent:", parsed);

    // This is where you'd implement the tracker interaction
    // For now, let's just return a placeholder
    return { seeders: 'Unknown', leechers: 'Unknown' };
}

// Usage example
const stats = getTorrentSeedersAndLeechers('path/to/your/torrent/file.torrent');
console.log(stats);

import Tracker from 'bittorrent-tracker';

async function getTorrentSeedersLeechers(torrentId) {
    return new Promise((resolve, reject) => {
        const client = new Tracker({
            infoHash: torrentId,
            peerId: new Uint8Array(20),
            announce: [], // list of tracker server URLs
            port: 6881
        });

        client.start();

        client.once('update', data => {
            resolve({
                seeders: data.complete,
                leechers: data.incomplete
            });
        });

        client.once('error', err => {
            reject(err);
        });
    });
}

// Usage example (ensure you use this in an async context or handle the promise properly)
try {
    const data = await getTorrentSeedersLeechers('yourTorrentInfoHash');
    console.log('Seeders:', data.seeders, 'Leechers:', data.leechers);
} catch (err) {
    console.error('Error:', err);
}
