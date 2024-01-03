<script>
</script>

<div class="max-w-xxl container mx-auto p-6">
	<h1 class="mb-2 text-center font-display-sans text-2xl font-bold tracking-wide text-gray-700">
		APPLICATION REVIEW
	</h1>
	<div class="mt-4 grid grid-cols-5 place-content-center justify-center gap-4 text-gray-700">
		<div class="text-center">
			<h3 class="text-2xl text-orange-500">645</h3>
			<p class="text-sm">Applications</p>
		</div>
		<div class="text-center">
			<h3 class="text-2xl text-blue-500">200</h3>
			<p class="text-sm">Pending</p>
		</div>
		<div class="text-center">
			<h3 class="text-2xl text-green-500">300</h3>
			<p class="text-sm">Accepted</p>
		</div>
		<div class="text-center">
			<h3 class="text-2xl text-red-500">22</h3>
			<p class="text-sm">Rejected</p>
		</div>
		<div class="text-center">
			<h3 class="text-2xl text-yellow-500">123</h3>
			<p class="text-sm">Waitlisted</p>
		</div>
	</div>

	<!-- <div class="form-control mx-auto pt-6">
		<h3 class="mb-3 text-xl text-gray-700">Filters</h3>
		<div class="grid grid-cols-3 place-content-center justify-center gap-4 text-gray-700">
			<select class="select-secondary select text-gray-700">
				<option selected disabled>Status</option>
				<option>Accepted</option>
				<option>Rejected</option>
				<option>Waitlisted</option>
			</select>
			<select class="select-secondary select text-gray-700">
				<option selected disabled>Year</option>
				<option>Freshman</option>
				<option>Sophomore</option>
				<option>Junior</option>
				<option>Senior</option>
				<option>Other</option>
			</select>
			<select class="select-secondary select text-gray-700">
				<option selected disabled>School</option>
				<option>UCLA</option>
				<option>Other</option>
			</select>
		</div>
	</div> -->

	<form class="pt-4">
		<div class="flex items-center border-b-2 border-gray-700 py-2">
			<input
				class="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
				type="text"
				placeholder="Filter"
				aria-label="Filter"
			/>
		</div>
	</form>

	<div class="pt-4">
		<table class="table text-gray-700">
			<!-- head -->
			<thead class="text-gray-700">
				<!-- <tr>
					<th>Name</th>
					<th>Year</th>
					<th>Email</th>
					<th>School</th>
					<th>Status</th>
				</tr> -->
			</thead>
			<tbody>
				<!-- row 1 -->
				<tr class="application-row border-2 border-gray-500 bg-green-100 hover:bg-green-300">
					<td>Applicant 1</td>
					<td>Freshman</td>
					<td>app1@ucla.edu</td>
					<td>University of California, Los Angeles</td>
					<td>Accepted</td>
				</tr>
				<!-- row 2 -->
				<tr class="application-row border-2 border-gray-500 bg-green-100 hover:bg-green-300">
					<td>Applicant 2</td>
					<td>Sophomore</td>
					<td>app2@ucla.edu</td>
					<td>University of California, Los Angeles</td>
					<td>Accepted</td>
				</tr>
				<!-- row 3 -->
				<tr class="application-row border-2 border-gray-500 bg-green-100 hover:bg-green-300">
					<td>Applicant 3</td>
					<td>Junior</td>
					<td>app3@ucla.edu</td>
					<td>University of California, Los Angeles</td>
					<td>Accepted</td>
				</tr>
				<!-- row 4 -->
				<tr class="application-row border-2 border-gray-500 bg-blue-100 hover:bg-blue-300">
					<td>Applicant 4</td>
					<td>Junior</td>
					<td>app4@ucla.edu</td>
					<td>University of California, Los Angeles</td>
					<td>Pending</td>
				</tr>

				<!-- row 5 -->
				<tr class="application-row border-2 border-gray-500 bg-green-100 hover:bg-green-300">
					<td>Applicant 5</td>
					<td>Senior</td>
					<td>app5@ucla.edu</td>
					<td>University of California, Los Angeles</td>
					<td>Accepted</td>
				</tr>
				<!-- row 6 -->
				<tr class="application-row border-2 border-gray-500 bg-red-100 hover:bg-red-300">
					<td>Applicant 6</td>
					<td>Senior</td>
					<td>app6@ucla.edu</td>
					<td>University of California, Los Angeles</td>
					<td>Rejected</td>
				</tr>
				<!-- row 7 -->
				<tr class="application-row border-2 border-gray-500 bg-yellow-100 hover:bg-yellow-300">
					<td>Applicant 7</td>
					<td>Senior</td>
					<td>app7@ucla.edu</td>
					<td>University of California, Los Angeles</td>
					<td>Waitlisted</td>
				</tr>
				<!-- row 8 -->
				<tr class="application-row border-2 border-gray-500 bg-blue-100 hover:bg-blue-300">
					<td>Applicant 8</td>
					<td>Senior</td>
					<td>app8@ucla.edu</td>
					<td>University of California, Los Angeles</td>
					<td>Pending</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
