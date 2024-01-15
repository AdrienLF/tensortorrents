import { createDatabase } from '../database/create_database';
import { get_files_from_torrent } from './get_files_from_torrent';
import { generateMagnetLink } from '../generateMagnetlink';
import { getTorrentUrl } from './get_torrent_url';
import { validateFiles } from './validateFiles';
import { json } from '@sveltejs/kit';

export async function uploadTorrent(files) {
	try {
		const supabase = createDatabase();
		console.log(files);

		if (!files || files.length === 0) {
			throw new Error('You must select a torrent file to upload.');
		}

		const file = files[0];

		let torrent_files

		torrent_files = await get_files_from_torrent(file)
		
		console.log(torrent_files)

		validateFiles(torrent_files)

		let magnet_link = await generateMagnetLink(file);
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

		let torrent_URL = await getTorrentUrl(filePath);

		if (error) {
			throw error;
		}

		let url = filePath;

        console.log( url, magnet_link, torrent_URL, torrent_files )
		let torrent_files_str = JSON.stringify(torrent_files)
		
		console.log(torrent_files_str)
		return  {url, magnet_link, torrent_URL, torrent_files_str};
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		}
	}
}
