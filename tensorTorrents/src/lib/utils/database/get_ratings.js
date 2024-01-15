import { createDatabase } from "./create_database";

export async function getRatingForVersion(versionId) {
    console.log(versionId)
    const supabase = createDatabase();

    // Fetching all ratings for the specified version
    let { data:ratings, error} = await supabase
        .from('ratings')
        .select('rating')
        .eq('version_id', versionId);

    console.log("ok")
    console.log(ratings, error)

    if (error) {
        console.error('Error fetching ratings:', error);
        return null;
    }

    let totalVotes = ratings?.length
    // Calculating the average rating
    const totalRatingSum = ratings.reduce((acc, { rating }) => acc + rating, 0);
    console.log(totalRatingSum)
    const averageRating = totalVotes > 0 ? totalRatingSum / totalVotes : 0;
    console.log(averageRating)
    console.log('Average Rating:', averageRating);
    return {versionId, averageRating, totalVotes} ;
}
