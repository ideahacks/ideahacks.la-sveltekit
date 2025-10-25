<script>
	import redpill from '$lib/images/redpill.svg';
	import yellowpill from '$lib/images/yellowpill.svg';
	import greenpill from '$lib/images/greenpill.svg';
	import orangepill from '$lib/images/orangepill.svg';
</script>

<!-- SCHEDULE title at 70% -->
<div class="absolute top-[70%] left-1/2 transform -translate-x-1/2 z-20">
	<h2
		class="text-white text-5xl sm:text-6xl md:text-7xl font-bold text-center"
		style="font-family: 'Ethnocentric', sans-serif; text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;"
	>
		SCHEDULE
	</h2>
</div>

<!-- Schedule content positioned at 72.5% from top -->
<div class="absolute top-[72.5%] left-1/2 transform -translate-x-1/2 w-3/4 z-20">
	<div class="flex justify-center items-start">
		<div class="block w-3/5">
			<div class="relative">
				<!-- Vertical timeline centered within the left slot -->
				<div class="absolute top-0 bottom-0 left-6 w-0">
					<div
						class="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 bg-white opacity-60 rounded-full"
					></div>
					<div
						class="absolute left-1/2 top-0 w-8 h-8 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
					></div>
				</div>

				<!-- Rows: each row controls its own pill vertical centering -->
				<div class="space-y-1">
					<!-- Friday Title Row -->
					<div class="relative flex items-center min-h-[48px]">
						<!-- Pill centered on line -->
						<img
							src={redpill}
							alt="Friday"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<!-- Text -->
						<div class="w-full text-center">
							<p
								class="m-0 text-white text-lg md:text-xl font-bold"
								style="font-family: 'Roboto Mono', monospace;"
							>
								FRIDAY
							</p>
						</div>
					</div>

					<!-- Friday Item 1 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={orangepill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								4:30-8:00 PM • Check in • Ackerman Union 2408
							</p>
						</div>
					</div>

					<!-- Friday Item 2 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={yellowpill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								5:00-5:45 PM • Web Dev Workshop • Ackerman Union 2408
							</p>
						</div>
					</div>

					<!-- Friday Item 3 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={greenpill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								6:00-6:45 PM • IDEA Hacks Kickoff • Ackerman Grand Ballroom
							</p>
						</div>
					</div>

					<!-- Saturday Title Row -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={redpill}
							alt="Saturday"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-center">
							<p
								class="m-0 text-white text-lg md:text-xl font-bold"
								style="font-family: 'Roboto Mono', monospace;"
							>
								SATURDAY
							</p>
						</div>
					</div>

					<!-- Saturday Item 1 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={orangepill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								8:00-9:00 AM • Breakfast • Ackerman Grand Ballroom
							</p>
						</div>
					</div>

					<!-- Saturday Item 2 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={yellowpill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								10:00-11:00 AM • Hardware Workshop • Ackerman Union 2408
							</p>
						</div>
					</div>

					<!-- Saturday Item 3 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={greenpill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								12:00-1:00 PM • Lunch • Ackerman Grand Ballroom
							</p>
						</div>
					</div>

					<!-- Saturday Item 4 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={orangepill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								2:00-3:00 PM • AI/ML Workshop • Ackerman Union 2408
							</p>
						</div>
					</div>

					<!-- Saturday Item 5 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={yellowpill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								6:00-6:45 PM • 3D Printing Workshop • Ackerman Union 2408
							</p>
						</div>
					</div>

					<!-- Sunday Title Row -->
					<div class="relative flex items-center min-h-[48px]">
						<!-- Pill centered on line -->
						<img
							src={redpill}
							alt="Sunday"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<!-- Text -->
						<div class="w-full text-center">
							<p
								class="m-0 text-white text-lg md:text-xl font-bold"
								style="font-family: 'Roboto Mono', monospace;"
							>
								SUNDAY
							</p>
						</div>
					</div>

					<!-- Sunday Item 1 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={orangepill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								8:00-9:00 AM • Breakfast • Ackerman Grand Ballroom
							</p>
						</div>
					</div>

					<!-- Sunday Item 2 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={yellowpill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								10:00-11:00 AM • Pitch Workshop • Ackerman Union 2408
							</p>
						</div>
					</div>

					<!-- Sunday Item 3 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={greenpill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								12:00-1:00 PM • Lunch • Ackerman Grand Ballroom
							</p>
						</div>
					</div>

					<!-- Sunday Item 4 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={orangepill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								2:00-3:00 PM • Project Submissions Due • Devpost
							</p>
						</div>
					</div>

					<!-- Sunday Item 5 -->
					<div class="relative flex items-center min-h-[48px]">
						<img
							src={yellowpill}
							alt="Event"
							class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28"
						/>
						<div class="w-full text-left pl-36">
							<p
								class="m-0 text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								4:00-6:00 PM • Judging & Awards Ceremony • Ackerman Grand Ballroom
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
