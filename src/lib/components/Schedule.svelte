<script>
	import TimelineItem from './TimelineItem.svelte';
</script>

<div class="font-pantone py-4 text-center text-2xl font-extrabold">IDEA Hacks Schedule</div>
<div class="flex flex-wrap justify-around gap-4 p-4">
	<div
		class="timeline timeline-vertical timeline-snap-icon rounded-box p-4 max-md:timeline-compact"
		style="background-color:rgba(255, 255, 255, 0.3)"
	>
		<div class="rounded-box py-4 text-center font-mono text-xl font-extrabold">FRIDAY, JAN. 17</div>
		<TimelineItem
			time="6:00-6:45 PM"
			title="IDEA Hacks Kickoff"
			location="Ackerman Grand Ballroom"
			alignment="start"
			first={true}
		/>

		<TimelineItem
			time="4:30-8:00 PM"
			title="Check-In"
			location="Ackerman Union 2408"
			alignment="end"
		/>

		<TimelineItem
			time="5:00-5:45 PM"
			title="Web Dev Workshop"
			location="Ackerman Union 2408"
			alignment="start"
		/>

		<TimelineItem
			time="6:00-6:45 PM"
			title="3D Printing Workshop"
			location="Ackerman Union 2408"
			alignment="end"
			last={true}
		/>
	</div>

	<div
		class="timeline timeline-vertical timeline-snap-icon rounded-box p-4 max-md:timeline-compact"
		style="background-color:rgba(255, 255, 255, 0.3)"
	>
		<div class="py-4 text-center font-mono text-xl font-extrabold">SATURDAY, JAN. 18</div>
		<TimelineItem
			time="6:00-6:45 PM"
			title="IDEA Hacks Kickoff"
			location="Ackerman Grand Ballroom"
			alignment="start"
			first={true}
		/>

		<TimelineItem
			time="4:30-8:00 PM"
			title="Check-In"
			location="Ackerman Union 2408"
			alignment="end"
		/>

		<TimelineItem
			time="5:00-5:45 PM"
			title="Web Dev Workshop"
			location="Ackerman Union 2408"
			alignment="start"
		/>

		<TimelineItem
			time="6:00-6:45 PM"
			title="3D Printing Workshop"
			location="Ackerman Union 2408"
			alignment="end"
			last={true}
		/>
	</div>

	<div
		class="timeline timeline-vertical timeline-snap-icon rounded-box p-4 max-md:timeline-compact"
		style="background-color:rgba(255, 255, 255, 0.3)"
	>
		<div class="py-4 text-center font-mono text-xl font-extrabold">SUNDAY, JAN. 19</div>
		<TimelineItem
			time="6:00-6:45 PM"
			title="IDEA Hacks Kickoff"
			location="Ackerman Grand Ballroom"
			alignment="start"
			first={true}
		/>

		<TimelineItem
			time="4:30-8:00 PM"
			title="Check-In"
			location="Ackerman Union 2408"
			alignment="end"
		/>

		<TimelineItem
			time="5:00-5:45 PM"
			title="Web Dev Workshop"
			location="Ackerman Union 2408"
			alignment="start"
		/>

		<TimelineItem
			time="6:00-6:45 PM"
			title="3D Printing Workshop"
			location="Ackerman Union 2408"
			alignment="end"
			last={true}
		/>
	</div>
</div>
