<script>
	export let time;
	export let title;
	export let location = 'Ackerman Grand Ballroom';
	export let alignment = 'start'; // 'start' or 'end' for alignment - This is not used in this version.
	export let first = false; // Not used in this version
	export let last = false; // Not used in this version
</script>

<ul class="timeline timeline-vertical font-encode">
	<li>
		{#if !first}
			<hr />
		{/if}
		<div class="timeline-start">{time}</div>
		<div class="timeline-middle">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="h-5 w-5"
			>
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>
		<div class="timeline-end timeline-box bg-opacity-10">
			<div class="font-paytone text-lg font-black">{title}</div>
			<div>{location}</div>
		</div>
		{#if !last}
			<hr />
		{/if}
	</li>
</ul>
