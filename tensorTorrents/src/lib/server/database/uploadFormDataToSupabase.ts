import { getImagesFromAlbum } from "../imgur/getImagesFromAlbum";
interface ModelData {
	name: string;
    imgur_link:string;
    type_id:number;
	checkpoint_type: string;
	category: string;
	description: string;
}

interface VersionData {
	model_id: number;
	version_name: string;
	early_access: boolean;
	base_model: string;
	version_changes: string;
	trigger_words: string;
	trigger_bool: boolean;
}
export async function uploadFormDataToSupabase(formData: FormData, supabase) {
    // Convert FormData to a plain object
    const formObj: { [key: string]: string } = {};
    formData.forEach((value, key) => {
        formObj[key] = value;
    });

    // Log formObj to check the values
    console.log('Form Object:', formObj);

    let previewImageUrl;
    if (formObj['imgur_link']) {
        try {
            // Fetch the preview image URL using the Imgur link
            previewImageUrl = await getImagesFromAlbum(formObj['imgur_link']);
        } catch (error) {
            console.error('Error fetching preview image URL:', error);
            // Handle the error or set a default value for previewImageUrl
        }
    }

    // Prepare data for the 'Models' table
    const modelData: ModelData = {
        owner:formObj['owner'],
        name: formObj['name'],
        imgur_link: formObj['imgur_link'],
        type_id: formObj['type'],
        checkpoint_type: formObj['checkpoint_type'],
        category: formObj['category'],
        description: formObj['description'],
        preview_img_url: previewImageUrl
    };

    // Log modelData to check the values
    console.log('Model Data:', modelData);

    // Insert data into the 'Models' table
    const { data, error} = await supabase
        .from<ModelData>('models')
        .insert([modelData])
        .select()

    console.log(data)

    if (error) {
        console.error('Error inserting data into models:', error);
        return;
    }


    // Check if modelInsertData is valid and has an ID
    if (!data || data.length === 0 || !data[0].model_id) {
        console.error('Model data was not inserted correctly, no ID returned.');
        return;
    }

    const modelId = data[0].model_id;
    console.log(modelId)

    // Prepare data for the 'Versions' table
    const versionData: VersionData = {
        model_id: modelId, // Ensure this is correctly added
        version_name: formObj['version-name'],
        early_access: formObj['earlyAccess'] === 'true',
        base_model_id: formObj['base-model'],
        version_changes: formObj['version-changes'],
        trigger_words: formObj['trigger-words'],
        trigger_bool: formObj['trigger_bool'] === 'true',
        torrent_file_url: formObj['torrent_url'], 
        magnet_link: formObj['magnet_link'],
        torrent_files: formObj['torrent_files'] 
    };
    console.log(versionData)

    // Insert data into the 'Versions' table
    const { error: versionInsertError } = await supabase
        .from<VersionData>('versions')
        .insert([versionData]);

    if (versionInsertError) {
        console.error('Error inserting data into versions:', versionInsertError);
    }
}


// Example usage (assuming supabase is the initialized SupabaseClient instance):
// const formData = new FormData(document.querySelector('form'));
// await uploadFormDataToSupabase(formData, supabase);
