<script>
	import PartInfoCard from '$lib/components/PartInfoCard.svelte';
	let part1_data = {
		name: 'servo',
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMHl1zzf2xBblrL8ojRvyta9CzOVZrEYbBJQ&s',
		quantity: 20,
		id: 12345
	};
</script>

<PartInfoCard part_data={part1_data} />
