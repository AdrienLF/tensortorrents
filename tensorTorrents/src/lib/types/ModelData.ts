export interface ModelData {
    model_id: number;
    name: string;
    checkpoint_type: 'Trained' | 'Merged'; // Assuming 'Merged' is another valid value
    category: string;
    description: string;
    upload_date: string; // This follows the ISO 8601 date format
    rating: string | null; // Assuming rating is a string and can be null
    type_id: number;
    imgur_link: string;
    modeltypes: {
      name: string;
      type_id: number;
    };
  }
  