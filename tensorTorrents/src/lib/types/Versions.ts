export interface Version {
    version_id: number;
    model_id: number;
    version_name: string;
    early_access: boolean;
    version_changes: string;
    trigger_words: string;
    trigger_bool: boolean;
    base_model_id: number;
    basemodels: BaseModel;
    torrent_file_url: string; // New property for the torrent file URL
    magnet_link: string;      // New property for the magnet link
}

export interface BaseModel {
    name: string;
    base_model_id: number;
}

// If you will be using an array of Version objects
export type VersionsArray = Version[];
