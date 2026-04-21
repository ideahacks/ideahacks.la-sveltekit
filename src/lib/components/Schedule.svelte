<script lang="ts">
	import SectionTitle from './SectionTitle.svelte';

	type EventType = 'Technical Workshop' | 'Meal' | 'Event-wide' | 'Corporate' | 'Fun' | 'Other';

	interface Event {
		startTime: string;
		endTime: string;
		title: string;
		eventType: EventType;
		location: string;
	}

	interface ScheduleSection {
		title: string;
		events: Event[];
	}

	const fridayEvents: Event[] = [
		{
			startTime: '5:00 PM',
			endTime: '6:00 PM',
			title: 'Set Up',
			eventType: 'Other',
			location: 'IEEE Lab'
		},
		{
			startTime: '6:00 PM',
			endTime: '7:00 PM',
			title: 'MAIN SET-UP',
			eventType: 'Other',
			location: 'ENG 6'
		},
		{
			startTime: '7:00 PM',
			endTime: '8:00 PM',
			title: 'Check In',
			eventType: 'Event-wide',
			location: 'ENG 6'
		},
		{
			startTime: '7:30 PM',
			endTime: '8:30 PM',
			title: 'Digikey / Microchip Workshop',
			eventType: 'Technical Workshop',
			location: 'Mong'
		},
		{
			startTime: '8:30 PM',
			endTime: '9:00 PM',
			title: 'Opening presentation',
			eventType: 'Event-wide',
			location: ''
		},
		{
			startTime: '9:00 PM',
			endTime: '9:45 PM',
			title: 'Teambuilding workshop',
			eventType: 'Technical Workshop',
			location: ''
		},
		{
			startTime: '9:45 PM',
			endTime: '',
			title: 'Team Registration Closes',
			eventType: 'Fun',
			location: ''
		},
		{
			startTime: '10:00 PM',
			endTime: '',
			title: 'Hacking begins',
			eventType: 'Fun',
			location: ''
		},
		{
			startTime: '10:00 PM',
			endTime: '10:45 PM',
			title: 'Microcontroller Selection workshop',
			eventType: 'Technical Workshop',
			location: ''
		},
		{
			startTime: '11:00 PM',
			endTime: '12:00 AM',
			title: 'Wireless Connectivity workshop',
			eventType: 'Technical Workshop',
			location: ''
		}
	];

	const saturdayEvents: Event[] = [
		{
			startTime: '8:00 AM',
			endTime: '10:00 AM',
			title: 'Breakfast',
			eventType: 'Meal',
			location: ''
		},
		{
			startTime: '10:00 AM',
			endTime: '11:00 AM',
			title: 'Product Design Workshop',
			eventType: 'Technical Workshop',
			location: ''
		},
		{
			startTime: '12:00 PM',
			endTime: '1:30 PM',
			title: 'Lunch',
			eventType: 'Meal',
			location: ''
		},
		{
			startTime: '2:00 PM',
			endTime: '3:00 PM',
			title: 'Soldering Workshop',
			eventType: 'Technical Workshop',
			location: 'Makerspace'
		},
		{
			startTime: '4:00 PM',
			endTime: '5:00 PM',
			title: '3D Printing / CAD workshop',
			eventType: 'Technical Workshop',
			location: ''
		},
		{
			startTime: '6:00 PM',
			endTime: '7:30 PM',
			title: 'Dinner',
			eventType: 'Meal',
			location: ''
		},
		{
			startTime: '9:00 PM',
			endTime: '12:00 AM',
			title: 'Frog Night',
			eventType: 'Event-wide',
			location: ''
		}
	];

	const sundayEvents: Event[] = [
		{
			startTime: '8:00 AM',
			endTime: '9:30 AM',
			title: 'Breakfast',
			eventType: 'Meal',
			location: ''
		},
		{
			startTime: '9:00 AM',
			endTime: '',
			title: 'Hacking ends and Project submissions due',
			eventType: 'Fun',
			location: ''
		},
		{
			startTime: '9:15 AM',
			endTime: '10:45 AM',
			title: 'Round 1 judging',
			eventType: 'Event-wide',
			location: ''
		},
		{
			startTime: '11:00 AM',
			endTime: '12:30 PM',
			title: 'Judging Finals',
			eventType: 'Event-wide',
			location: ''
		},
		{
			startTime: '12:40 PM',
			endTime: '1:00 PM',
			title: 'Awards and closing',
			eventType: 'Event-wide',
			location: ''
		}
	];

	const defaultSchedules: ScheduleSection[] = [
		{
			title: 'FRIDAY',
			events: fridayEvents
		},
		{
			title: 'SATURDAY',
			events: saturdayEvents
		},
		{
			title: 'SUNDAY',
			events: sundayEvents
		}
	];

	export let schedules: ScheduleSection[] = defaultSchedules;

	const typeBadgeClassMap: Record<EventType, string> = {
		'Technical Workshop': 'bg-yellow-300/25 text-yellow-100 border-yellow-200/40',
		Meal: 'bg-green-300/25 text-green-100 border-green-200/40',
		'Event-wide': 'bg-red-300/25 text-red-100 border-red-200/40',
		Corporate: 'bg-orange-300/25 text-orange-100 border-orange-200/40',
		Fun: 'bg-pink-300/25 text-pink-100 border-pink-200/40',
		Other: 'bg-slate-300/20 text-slate-100 border-slate-200/40'
	};

	function getTypeBadgeClass(eventType: EventType): string {
		return typeBadgeClassMap[eventType];
	}

	function formatTimeRange(event: Event): string {
		return event.endTime ? `${event.startTime} - ${event.endTime}` : event.startTime;
	}

	function revealOnScroll(node: HTMLElement) {
		node.classList.add('event-row-hidden');

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						node.classList.add('event-row-visible');
						observer.unobserve(node);
					}
				}
			},
			{ threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<div class="py-20 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="text-center">
			<SectionTitle title="SCHEDULE" />
		</div>

		<div class="space-y-8">
			{#each schedules as schedule}
				<section>
					<h2
						class="text-center text-white text-xl md:text-2xl font-bold tracking-wide mb-5"
						style="font-family: 'Roboto Mono', monospace;"
					>
						{schedule.title}
					</h2>

					<div class="max-w-3xl mx-auto">
						<div class="space-y-2.5">
							{#each schedule.events as event}
								<div class="event-row" use:revealOnScroll>
									<div
										class="rounded-lg border border-white/15 bg-white/10 px-3 py-2 md:px-4 md:py-2 w-full max-w-2xl mx-auto"
									>
										<div
											class="min-w-0 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between"
										>
											<div class="text-center sm:text-left">
												<p
													class="text-white/75 text-xs md:text-[13px] uppercase tracking-[0.11em]"
													style="font-family: 'Roboto Mono', monospace;"
												>
													{formatTimeRange(event)}
												</p>
												<p
													class="text-white text-base md:text-[17px] font-semibold"
													style="font-family: 'Roboto Mono', monospace;"
												>
													{event.title}
												</p>
												{#if event.location}
													<p
														class="text-white/70 text-sm"
														style="font-family: 'Roboto Mono', monospace;"
													>
														{event.location}
													</p>
												{/if}
											</div>
											<span
												class={`self-center sm:self-auto shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] uppercase tracking-[0.08em] ${getTypeBadgeClass(event.eventType)}`}
												style="font-family: 'Roboto Mono', monospace;"
											>
												{event.eventType}
											</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</section>
			{/each}
		</div>
	</div>
</div>

<style>
	.event-row-hidden {
		opacity: 0;
		transform: translateY(14px) scale(0.985);
	}

	.event-row-visible {
		opacity: 1;
		transform: translateY(0) scale(1);
		transition:
			opacity 0.45s ease,
			transform 0.45s ease;
	}

	@media (prefers-reduced-motion: reduce) {
		.event-row-hidden,
		.event-row-visible {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
