<script>
	import TimelineItem from './TimelineItem.svelte';
</script>

<h1 class="font-paytone text-2xl text-white xl:text-4xl">
	<span>Schedule</span>
</h1>
<div
	class="gap-4 rounded-box bg-white bg-opacity-0 pb-4 pt-2 text-sm text-white md:flex lg:flex lg:bg-opacity-0"
>
	<div
		class="lg:to-opacity-20 timeline timeline-vertical timeline-snap-icon w-full rounded-box px-2 max-[500px]:timeline-compact md:bg-gradient-to-b md:from-transparent md:to-[#83c3e8] lg:w-auto lg:bg-gradient-to-b lg:from-transparent lg:to-[#83c3e8]"
	>
		<div
			class="rounded-box pt-4 font-mono text-lg font-extrabold md:pb-4 md:text-center lg:pb-4 lg:text-center"
		>
			FRIDAY, JAN. 17
		</div>
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
		class="lg:to-opacity-20 timeline timeline-vertical timeline-snap-icon w-full rounded-box px-2 max-[500px]:timeline-compact md:bg-gradient-to-b md:from-transparent md:to-[#83c3e8] lg:w-auto lg:bg-gradient-to-b lg:from-transparent lg:to-[#83c3e8]"
	>
		<div
			class="pt-4 font-mono text-lg font-extrabold md:pb-4 md:text-center lg:pb-4 lg:text-center"
		>
			SATURDAY, JAN. 18
		</div>
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
		class="timeline timeline-vertical timeline-snap-icon w-full rounded-box px-2 max-[500px]:timeline-compact md:bg-gradient-to-b md:from-transparent md:to-[#83c3e8] lg:w-auto lg:bg-opacity-20 lg:bg-gradient-to-b lg:from-transparent lg:to-[#83c3e8]"
	>
		<div
			class="pt-4 font-mono text-lg font-extrabold md:pb-4 md:text-center lg:pb-4 lg:text-center"
		>
			SUNDAY, JAN. 19
		</div>
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
