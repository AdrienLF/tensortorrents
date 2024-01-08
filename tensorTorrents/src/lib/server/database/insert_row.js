export async function insert_row(supabase, name, description) {
	const { data, error } = await supabase
		.from('models')
		.insert([{ name: name, description: description }])
		.select();

	console.log(data);
	console.log(error);
}
