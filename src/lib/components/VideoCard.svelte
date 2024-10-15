<script>
	// Define props using export
	export let videoSrc =
		'https://www.youtube.com/embed/LlLbIgA4zQg?list=PLAWsHzw_h0ijkoUcG9G8KGnoqHdf9L0co';
	export let title = 'Example Title';
	export let taughtBy = 'Yoseph Mama';
	export let description = `This workshop video explains the basics of hackathons, which are events where people work together to create technology projects. You'll learn what to expect and how to make the most out of your experience. By the end of the video, you'll have a better understanding of what hackathons are all about and how to get started with attending one. Happy hacking, handy hackers! VideoSlides`;
</script>

<div
	class="card w-1/5 min-w-72 transform bg-base-100 shadow-xl transition-transform hover:scale-105"
>
	<figure class="aspect-h-9 aspect-w-16">
		<iframe
			src={videoSrc}
			class=" w-full object-contain"
			title="Basic Circuits Workshop - Workshops Fall 2023 - 10/12/2023"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		/>
	</figure>
	<a href={videoSrc}>
		<div class="card-body p-4">
			<!-- Card Title -->
			<h1 class="line-clamp-2 font-paytone text-2xl">{title}</h1>
			<h2 class="text-md line-clamp-1 font-encode">Taught By: {taughtBy}</h2>

			<!-- Card description -->
			<p class="line-clamp-3">
				{description}
			</p>
		</div>
	</a>
</div>
