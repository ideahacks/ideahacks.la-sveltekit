<script>
	import TimelineItem from './TimelineItem.svelte';
	const fridaySchedule = [
		{
			Start: '4:30 PM',
			End: '8:00 PM',
			Event: 'Check In',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '5:00 PM',
			End: '5:45 PM',
			Event: 'Tentative: Webdev workshop',
			Location: 'Ackerman Union 2408'
		},
		{
			Start: '6:00 PM',
			End: '6:45 PM',
			Event: '3D Printing / CAD workshop',
			Location: 'Ackerman Union 2412'
		},
		{
			Start: '7:00 PM',
			End: '8:00 PM',
			Event: 'Teambuilding workshop',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '8:30 PM',
			End: '9:00 PM',
			Event: 'Opening presentation',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '8:40 PM',
			End: '',
			Event: 'Team Registration Closes',
			Location: ''
		},
		{
			Start: '9:00 PM',
			End: '',
			Event: 'Hacking begins',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '9:15 PM',
			End: '10:00 PM',
			Event: 'Microcontroller Selection workshop',
			Location: 'Ackerman Union 2408'
		},
		{
			Start: '10:15 PM',
			End: '11:00 PM',
			Event: 'Wireless Connectivity workshop',
			Location: 'Ackerman Union 2412'
		}
	];

	const saturdaySchedule = [
		{
			Start: '8:00 AM',
			End: '10:00 AM',
			Event: 'Breakfast',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '10:00 AM',
			End: '10:30 AM',
			Event: 'Breakfast meals to go',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '10:00 AM',
			End: '12:00 PM',
			Event: 'Digikey & Infineon Workshop',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '12:00 PM',
			End: '1:30 PM',
			Event: 'Lunch',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '1:30 PM',
			End: '3:00 PM',
			Event: 'Graduate School Tabling',
			Location: 'Ackerman Union 2412'
		},
		{
			Start: '4:00 PM',
			End: '5:00 PM',
			Event: 'Product Design Workshop',
			Location: 'Ackerman Union 2408'
		},
		{
			Start: '6:00 PM',
			End: '7:30 PM',
			Event: 'Dinner',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '7:30 PM',
			End: '8:00 PM',
			Event: 'Dinner meals to go',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '7:30 PM',
			End: '10:30 PM',
			Event: 'Frog Night',
			Location: 'Downstairs Makerspace'
		}
	];

	const sundaySchedule = [
		{
			Start: '8:00 AM',
			End: '9:30 AM',
			Event: 'Breakfast',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '9:00 AM',
			End: '',
			Event: 'Hacking ends and Project submissions due',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '9:00 AM',
			End: '9:15 AM',
			Event: 'Setup for judging',
			Location: ''
		},
		{
			Start: '9:15 AM',
			End: '10:45 AM',
			Event: 'Round 1 judging',
			Location: 'Ackerman Union 2408, 2410, 2412'
		},
		{
			Start: '11:00 AM',
			End: '12:30 PM',
			Event: 'Judging Finals',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '12:30 PM',
			End: '12:40 PM',
			Event: 'Post Event Survey',
			Location: ''
		},
		{
			Start: '12:40 PM',
			End: '1:00 PM',
			Event: 'Awards and closing',
			Location: 'Ackerman Grand Ballroom'
		},
		{
			Start: '1:00 PM',
			End: '2:30 PM',
			Event: 'Cleanup',
			Location: ''
		}
	];
</script>

<h1 class="font-paytone text-2xl text-white xl:text-4xl">
	<span>Schedule</span>
</h1>
<div
	class="gap-4 rounded-box bg-white bg-opacity-0 pb-4 pt-2 text-sm text-white md:flex lg:flex lg:bg-opacity-0"
>
	<div
		class=" lg:to-opacity-20 timeline timeline-vertical timeline-snap-icon w-full rounded-box px-2 max-[500px]:timeline-compact md:bg-gradient-to-b md:from-transparent md:to-[#83c3e8] lg:w-1/3 lg:bg-gradient-to-b lg:from-transparent lg:to-[#83c3e8]"
	>
		<div
			class="rounded-box pt-4 font-mono text-lg font-extrabold md:pb-4 md:text-center lg:pb-4 lg:text-center"
		>
			FRIDAY, JAN. 17
		</div>
		{#each fridaySchedule as event, index}
			<TimelineItem
				first={index === 0}
				time={event.Start + (event.End.length > 0 ? ' - ' + event.End : '')}
				title={event.Event}
				location={event.Location}
				alignment={index % 2 === 0 ? 'end' : 'start'}
				last={index === fridaySchedule.length - 1}
			/>
		{/each}
	</div>

	<div
		class="lg:to-opacity-20 timeline timeline-vertical timeline-snap-icon w-full rounded-box px-2 max-[500px]:timeline-compact md:bg-gradient-to-b md:from-transparent md:to-[#83c3e8] lg:w-1/3 lg:bg-gradient-to-b lg:from-transparent lg:to-[#83c3e8]"
	>
		<div
			class="pt-4 font-mono text-lg font-extrabold md:pb-4 md:text-center lg:pb-4 lg:text-center"
		>
			SATURDAY, JAN. 18
		</div>
		{#each saturdaySchedule as event, index}
			<TimelineItem
				first={index === 0}
				time={event.Start + (event.End.length > 0 ? ' - ' + event.End : '')}
				title={event.Event}
				location={event.Location}
				alignment={index % 2 === 0 ? 'end' : 'start'}
				last={index === saturdaySchedule.length - 1}
			/>
		{/each}
	</div>

	<div
		class="timeline timeline-vertical timeline-snap-icon w-full rounded-box px-2 max-[500px]:timeline-compact md:bg-gradient-to-b md:from-transparent md:to-[#83c3e8] lg:w-1/3 lg:bg-opacity-20 lg:bg-gradient-to-b lg:from-transparent lg:to-[#83c3e8]"
	>
		<div
			class="pt-4 font-mono text-lg font-extrabold md:pb-4 md:text-center lg:pb-4 lg:text-center"
		>
			SUNDAY, JAN. 19
		</div>
		{#each sundaySchedule as event, index}
			<TimelineItem
				first={index === 0}
				time={event.Start + (event.End.length > 0 ? '-' + event.End : '')}
				title={event.Event}
				location={event.Location}
				alignment={index % 2 === 0 ? 'end' : 'start'}
				last={index === sundaySchedule.length - 1}
			/>
		{/each}
	</div>
</div>
