import { createDatabase } from "../database/create_database";

export async function getTorrentUrl (path: string) {
    try {
        const supabase = createDatabase()
        const { data, error } = await supabase.storage.from('torrent_files').getPublicUrl(path);
        console.log(data);
        console.log(error);
        if (error) {
            throw error;
        }

        const url = data.publicUrl;
        let torrent_URL = url;
        console.log(torrent_URL);
        return torrent_URL
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error downloading torrent: ', error.message);
        }
    }
};