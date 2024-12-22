<script>
	export let data;
</script>

<div class="z-10 mx-5 my-10 max-w-4xl font-encode text-white md:mx-24">
	{#if data.session}
		{#if data.application}
			<p>
				Hello {data.application.preferred_name === ''
					? data.application.full_name
					: data.application.preferred_name}!
			</p>

			<h1 class="mt-10 font-paytone text-2xl">Your Application</h1>

			<p><span class="font-bold">Status:</span> {data.application.status}</p>
			<br />

			<p><span class="font-bold">Name:</span> {data.application.full_name}</p>
			<p><span class="font-bold">Email:</span> {data.application.email}</p>
			<p><span class="font-bold">School:</span> {data.application.school}</p>
			<p><span class="font-bold">Major:</span> {data.application.major}</p>
			<p>
				<span class="font-bold">Prior Engineering Experience:</span>
				{data.application.prior_engineering_experience}
			</p>
			<p><span class="font-bold">Why IDEA Hacks:</span> {data.application.why_ideahacks}</p>
			<p><span class="font-bold">Hackathon Ideas:</span> {data.application.hackathon_ideas}</p>
			<p>
				<span class="font-bold">Prior Hackathon Experience:</span>
				{data.application.prior_hackathon_experience}
			</p>
			<p><span class="font-bold">Suggested Parts:</span> {data.application.suggested_parts}</p>
			<p><span class="font-bold">Shirt Size:</span> {data.application.shirt_size}</p>
			<p>
				<span class="font-bold">Dietary Restrictions:</span>
				{data.application.dietary_restrictions}
			</p>

			<h1 class="mt-10 font-paytone text-2xl">Your Team</h1>
			<p>The team selection form will be released after applications decisions are released!</p>
			<p>If you don't have a team in mind, there is no need to fill it out</p>

			<h1 class="mt-10 font-paytone text-2xl">Parts</h1>
			<p>As you check out parts during the event, you will see them here</p>
			<p class="my-10 max-w-md opacity-50">
				If your application isn't showing correctly, please contact webmaster@ieeebruins.com or
				agariomasster on Discord
			</p>
		{:else}
			<h1 class="mt-10 font-paytone text-2xl">Your Application</h1>
			<p>No application was found under {data.session.user.email}</p>
			<p class="my-10 max-w-md opacity-50">
				If you submitted your application with another email and can't sign in with it. Please
				contact webmaster@ieeebruins.com or agariomasster on Discord
			</p>
		{/if}
	{:else}
		<h1 class="my-10 font-paytone text-3xl">Please log in!</h1>
	{/if}
</div>
