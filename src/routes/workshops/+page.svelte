<script lang="ts">
	import Clouds from '$lib/components/Clouds.svelte';
	import VideoCard from '$lib/components/VideoCard.svelte';

	interface Video {
		videoSrc: string;
		title: string;
		taughtBy: string;
		description: string;
	}

	const webDevListVideos: Video[] = [
		{
			videoSrc: 'https://www.youtube.com/embed/LlLbIgA4zQg?list=PLAWsHzw_h0ijkoUcG9G8KGnoqHdf9L0co',
			title: 'Web Dev Video',
			taughtBy: 'John Doe',
			description: `This workshop video explains the basics of hackathons, which are events where people work together to create technology projects. You'll learn what to expect and how to make the most out of your experience. By the end of the video, you'll have a better understanding of what hackathons are all about and how to get started with attending one. Happy hacking, handy hackers! VideoSlides`
		},
		{
			videoSrc: 'https://www.youtube.com/embed/LlLbIgA4zQg?list=PLAWsHzw_h0ijkoUcG9G8KGnoqHdf9L0co',
			title: 'Really Long Title For This Specific Web Dev Video',
			taughtBy: 'John Doe',
			description: `This workshop video explains the basics of hackathons, which are events where people work together to create technology projects. You'll learn what to expect and how to make the most out of your experience. By the end of the video, you'll have a better understanding of what hackathons are all about and how to get started with attending one. Happy hacking, handy hackers! VideoSlides`
		},
		{
			videoSrc: 'https://www.youtube.com/embed/LlLbIgA4zQg?list=PLAWsHzw_h0ijkoUcG9G8KGnoqHdf9L0co',
			title: 'Web Dev Video',
			taughtBy: 'John Doe',
			description: `This workshop video explains the basics of hackathons, which are events where people work together to create technology projects. You'll learn what to expect and how to make the most out of your experience. By the end of the video, you'll have a better understanding of what hackathons are all about and how to get started with attending one. Happy hacking, handy hackers! VideoSlides`
		}
	];
</script>

<div class="z-10">
	<!-- TYPE HEADER OUT LIKE THE  -->
	<h1 class="mb-8 mt-10 text-center font-paytone text-6xl font-bold text-white">Workshops</h1>

	<div class="mx-auto w-4/5">
		<h1 class="text-center font-encode text-2xl text-white">Web Development&nbsp; 🖥️</h1>
		<div class="flex flex-wrap justify-center gap-6 p-6">
			{#each webDevListVideos as video}
				<VideoCard
					videoSrc={video.videoSrc}
					title={video.title}
					taughtBy={video.taughtBy}
					description={video.description}
				/>
			{/each}
		</div>
	</div>

	<div class="mx-auto w-4/5">
		<h1 class="text-center font-encode text-2xl text-white">Mobile Development 📱</h1>
		<div class="flex flex-wrap justify-center gap-6 p-6">
			{#each webDevListVideos as video}
				<VideoCard
					videoSrc={video.videoSrc}
					title={video.title}
					taughtBy={video.taughtBy}
					description={video.description}
				/>
			{/each}
		</div>
	</div>

	<div class="mx-auto w-4/5">
		<h1 class="text-center font-encode text-2xl text-white">Other ⚡</h1>
		<div class="flex flex-wrap justify-center gap-6 p-6">
			{#each webDevListVideos as video}
				<VideoCard
					videoSrc={video.videoSrc}
					title={video.title}
					taughtBy={video.taughtBy}
					description={video.description}
				/>
			{/each}
		</div>
	</div>
</div>

<Clouds />
