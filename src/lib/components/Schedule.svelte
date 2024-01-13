<script lang="ts">
	import { AlertCircle, Sparkles } from 'lucide-svelte';
</script>

<div
	class="my-4 rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5 opacity-90 bg-blend-normal"
>
	<h2 id="schedule" class="mb-8 scroll-mt-8 font-display-serif text-5xl">Schedule</h2>
	<h2 class="mb-4 font-display-sans text-3xl font-bold">Friday, January 12th</h2>
	<div class="overflow-x-auto">
		<table class="table table-lg">
			<thead>
				<tr>
					<th>Event</th>
					<th>Time / Location</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Patient Safety Workshop</th>
					<td>6:00 pm - 6:45 pm <span class="badge">Ackerman Union 2412</span></td>
				</tr>
				<tr>
					<th>Check In</th>
					<td>4:30 pm - 8:00 pm <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
				<tr>
					<th>Webdev Workshop</th>
					<td>5:00 pm - 5:45 PM <span class="badge">Ackerman Union 2408</span></td>
				</tr>
				<tr>
					<th>3D Printing Workshop</th>
					<td>6:00 pm - 6:45 pm <span class="badge">Ackerman Union 2408</span></td>
				</tr>
				<tr>
					<th>Team Building Workshop</th>
					<td>7:00 pm - 8:00 pm <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
				<tr>
					<th>Opening Presentation</th>
					<td>8:30 pm - 9:00 pm <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
				<tr>
					<th class="flex gap-1">Team Registration Closes <AlertCircle /> </th>
					<td
						>8:40 pm <a
							class="btn btn-primary btn-sm"
							target="_blank"
							href="https://docs.google.com/forms/d/e/1FAIpQLSdRzi8zHdy7qCTLZctq_O_9H3HJGjGfDaNHcnu4dbFr8yFgjw/viewform?usp=sf_link"
							>Register your team</a
						></td
					>
				</tr>
				<tr>
					<th class="flex gap-1">Hacking Begins <Sparkles /></th>
					<td>9:00 pm <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
				<tr>
					<th>Microcontroller Workshop</th>
					<td>9:15 pm - 10:00 pm <span class="badge">Ackerman Union 2408</span></td>
				</tr>
				<tr>
					<th class="max-w-32">Wireless Connectivity Workshop</th>
					<td>10:15 pm - 11:00 pm <span class="badge">Ackerman Union 2408</span></td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="divider" />

	<h2 class="mb-4 font-display-sans text-3xl font-bold">Saturday, January 13th</h2>
	<div class="overflow-x-auto">
		<table class="table table-lg">
			<thead>
				<tr>
					<th>Event</th>
					<th>Time / Location</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Breakfast</th>
					<td>8:00 am - 10:00 am <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
				<tr>
					<th class="max-w-80"
						>High Speed Data Acquisition, an introduction with Red Pitaya and Infineon</th
					>
					<td>10:00 am - 11:00 am <span class="badge">Ackerman Union 2412</span></td>
				</tr>
				<tr>
					<th>Screen Printing Workshop</th>
					<td>11:00 am - 12:00 pm <span class="badge">Ackerman Union 2408</span></td>
				</tr>
				<tr>
					<th>Lunch</th>
					<td>12:00 pm - 2:00 pm <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
				<tr>
					<th>Optiver Workshop</th>
					<td>3:00 pm - 4:00 pm <span class="badge">Ackerman Union 2408</span></td>
				</tr>
				<tr>
					<th>Game Music Ensemble Performance</th>
					<td>4:00 pm - 5:00 pm <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
				<tr>
					<th>Dinner</th>
					<td>6:00 pm - 8:00 pm <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
				<tr>
					<th>Bruin Chamber Musicians Performance</th>
					<td>7:00 pm - 8:00 pm <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="divider" />

	<h2 class="mb-4 font-display-sans text-3xl font-bold">Sunday, January 14th</h2>
	<div class="overflow-x-auto">
		<table class="table table-lg">
			<thead>
				<tr>
					<th>Event</th>
					<th>Time / Location</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Breakfast</th>
					<td>7:00 am - 9:00 am <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
				<tr>
					<th class="flex gap-1">Project Submission Due <AlertCircle /></th>
					<td
						>9:00 am <a
							class="btn btn-primary btn-sm"
							href="https://docs.google.com/document/d/1gEp8SQvJCnPL0rito7Kkgdvrn2xufTbJg8AVSnM447M/edit?usp=sharing"
							target="_blank">Submit your project</a
						></td
					>
				</tr>
				<tr>
					<th class="flex gap-1">Hacking Ends <Sparkles /></th>
					<td>9:00 am <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
				<tr>
					<th>Round 1 Judging</th>
					<td
						>9:15 am - 10:45 am <span class="badge">Ackerman Union 2408, 2410, 2412, 3517</span></td
					>
				</tr>
				<tr>
					<th>Judging Finals</th>
					<td>11:00 am - 12:30 pm <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
				<tr>
					<th>Awards and Closing</th>
					<td>12:40 pm - 1:00 pm <span class="badge">Ackerman Grand Ballroom</span></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
