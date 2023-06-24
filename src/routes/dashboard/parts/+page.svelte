<script lang="ts">
	import Fuse from 'fuse.js';

	const parts = [
		{
			title: 'lol'
		},
		{
			title: 'lmao'
		},
		{
			title: 'apple'
		}
	];

	const options = {
		keys: ['title']
	};

	const fuse = new Fuse(parts, options);

	$: filteredParts = fuse.search('apple');
</script>

<div class="text-xl">{JSON.stringify(filteredParts)}</div>
