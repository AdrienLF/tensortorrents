import { createDatabase } from "./create_database";

export async function getRatingForVersion(versionId) {
    const supabase = createDatabase();
    let { data, error, count } = await supabase
      .from('ratings')
      .select('rating', { count: 'exact' })
      .eq('version_id', versionId);
  
    if (error) {
      console.error('Error fetching ratings:', error);
      return null;
    }
  
    const averageRating = data.reduce((acc, { rating }) => acc + rating, 0) / count;
    return { versionId, averageRating, totalVotes};
  }
  