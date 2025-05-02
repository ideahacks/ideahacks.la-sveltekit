<script>
	import TimelineItem from './TimelineItem.svelte';
	import SelectionButton from './utility/SelectionButton.svelte';

	const fridaySchedule = [
		{
			Start: '4:30 PM',
			End: '8:00 PM',
			Event: 'Check In',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '5:30 PM',
			End: '7:00 PM',
			Event: 'Using SOC Boards (Digikey/Infineon)',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '6:00 PM',
			End: '6:45 PM',
			Event: '3D Printing / CAD workshop',
			Location: 'Conference Room 1'
		},
		{
			Start: '7:00 PM',
			End: '8:00 PM',
			Event: 'Teambuilding workshop',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '8:30 PM',
			End: '9:00 PM',
			Event: 'Opening presentation',
			Location: 'Covel Grand Horizon'
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
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '9:15 PM',
			End: '10:00 PM',
			Event: 'Microcontroller Selection Workshop',
			Location: 'Conference Room 1'
		},
		{
			Start: '10:00 PM',
			End: '10:45 PM',
			Event: 'Wireless Connectivity workshop',
			Location: 'Conference Room 2'
		},
		{
			Start: '11:00 PM',
			End: '',
			Event: 'Venue Closes',
			Location: ''
		}
	];

	const saturdaySchedule = [
		{
			Start: '7:30 AM',
			End: '',
			Event: 'Venue Opens',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '8:00 AM',
			End: '10:00 AM',
			Event: 'Breakfast',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '10:00 AM',
			End: '10:30 AM',
			Event: 'Breakfast meals to go',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '10:00 AM',
			End: '12:00 PM',
			Event: 'Product Design Workshop',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '12:00 PM',
			End: '1:30 PM',
			Event: 'Lunch',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '4:00 PM',
			End: '5:00 PM',
			Event: 'Digikey Infosession',
			Location: 'Conference Room 2'
		},
		{
			Start: '6:00 PM',
			End: '7:30 PM',
			Event: 'Dinner',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '7:30 PM',
			End: '8:00 PM',
			Event: 'Dinner meals to go',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '9:00 PM',
			End: '12:00 AM',
			Event: 'Frog Night',
			Location: 'Makerspace Floor 1'
		},
		{
			Start: '11:00 PM',
			End: '',
			Event: 'Venue Closes',
			Location: 'Covel Grand Horizon'
		}
	];

	const sundaySchedule = [
		{
			Start: '7:30 AM',
			End: '',
			Event: 'Venue Opens',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '8:00 AM',
			End: '9:30 AM',
			Event: 'Breakfast',
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '9:00 AM',
			End: '',
			Event: 'Hacking ends and Submissions due',
			Location: 'Covel Grand Horizon'
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
			Location: 'Conference Room 1, 2, 3'
		},
		{
			Start: '11:00 AM',
			End: '12:30 PM',
			Event: 'Judging Finals',
			Location: 'Covel Grand Horizon'
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
			Location: 'Covel Grand Horizon'
		},
		{
			Start: '1:00 PM',
			End: '2:30 PM',
			Event: 'Cleanup',
			Location: ''
		}
	];
	let currDay = 'Friday';
</script>

<SelectionButton
	className={currDay === 'Friday' ? 'btn-active bg-opacity-40' : 'btn-ghost text-white'}
	onClick={() => (currDay = 'Friday')}
	text="Friday"
/>
<SelectionButton
	className={currDay === 'Saturday' ? 'btn-active bg-opacity-40' : 'btn-ghost text-white'}
	onClick={() => (currDay = 'Saturday')}
	text="Saturday"
/>
<SelectionButton
	className={currDay === 'Sunday' ? 'btn-active bg-opacity-40' : 'btn-ghost text-white'}
	onClick={() => (currDay = 'Sunday')}
	text="Sunday"
/>
<div
	class="gap-4 rounded-box bg-white bg-opacity-0 pb-4 pt-2 text-sm text-white md:flex lg:flex lg:bg-opacity-0"
>
	{#if currDay === 'Friday'}
		<div class="fade-in timeline timeline-vertical timeline-snap-icon mx-auto rounded-box px-2">
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
	{/if}
	{#if currDay === 'Saturday'}
		<div class="fade-in timeline timeline-vertical timeline-snap-icon mx-auto rounded-box px-2">
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
	{/if}
	{#if currDay === 'Sunday'}
		<div class="fade-in timeline timeline-vertical timeline-snap-icon mx-auto rounded-box px-2">
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
	{/if}
</div>
