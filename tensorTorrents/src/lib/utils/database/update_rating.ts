import { createDatabase } from "./create_database";

export async function updateRatingInDatabase(userId, versionId, newRating) {
    // Check if the user has already rated this version
    console.log(userId, versionId, newRating)
    const supabase = createDatabase();
    let { data: existingRating, error: fetchError } = await supabase
      .from('ratings')
      .select('rating_id')
      .eq('user_id', userId)
      .eq('version_id', versionId)
      .single();
  
      console.log(existingRating)
      console.log(fetchError)
      if (fetchError) {
        console.error('Error checking existing rating:', fetchError);
        return null;
      }
  
    // Update if exists, otherwise insert a new rating
    if (existingRating) {
      console.log("updating...")
      const { error: updateError } = await supabase
        .from('ratings')
        .update({ rating: newRating })
        .eq('rating_id', existingRating.rating_id);
  
      if (updateError) {
        console.error('Error updating rating:', updateError);
        return null;
      }
      console.log('Rating updated successfully');
    } else {
      console.log("updating...")
      const { data, error: insertError } = await supabase
        .from('ratings')
        .insert([
          { user_id: userId, version_id: versionId, rating: newRating }
        ])
        ;
        
  
        console.log(data)
      if (insertError) {
        console.error('Error inserting new rating:', insertError);
        return null;
      }
      console.log('New rating added successfully');
    }
  }