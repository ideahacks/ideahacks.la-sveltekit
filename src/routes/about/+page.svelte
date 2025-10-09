<script lang="ts">
	import { onMount } from 'svelte';

	function scrollToSection(id: string) {
		const target = document.getElementById(id);
		if (!target) return;

		const top = target.getBoundingClientRect().top + window.scrollY;
		window.scrollTo({
			top,
			behavior: 'smooth'
		});
	}
</script>

<!-- Navigation Bar -->
<nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
	<div class="max-w-6xl mx-auto px-4 py-3">
		<div class="flex items-center justify-between">
			<a href="/" class="text-xl font-bold text-gray-900">IDEA Hacks</a>
			<div class="hidden md:flex space-x-6">
				<a href="/" class="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
				<a href="/about" class="text-gray-900 font-semibold">About</a>
				<a href="/workshops" class="text-gray-600 hover:text-gray-900 transition-colors">Workshops</a>
				<a href="/parts" class="text-gray-600 hover:text-gray-900 transition-colors">Parts</a>
				<a href="/login" class="text-gray-600 hover:text-gray-900 transition-colors">Login</a>
			</div>
			<!-- Mobile menu button -->
			<button class="md:hidden">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
				</svg>
			</button>
		</div>
	</div>
</nav>

<!-- Hero Section -->
<section class="w-full bg-gradient-to-b from-blue-600 to-blue-400 h-screen text-white pt-16">
	<div class="flex h-screen flex-col items-center justify-center text-center px-4">
		<h1 class="text-6xl font-bold tracking-tight max-md:text-4xl mb-4">IDEA Hacks 2026</h1>
		<p class="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
			The Largest Hardware Hackathon on the West Coast
		</p>
		<p class="text-lg text-blue-200 max-w-3xl mx-auto leading-relaxed mt-4">
			36 hours of innovation, creativity, and building the future
		</p>

		<!-- Chevron Button -->
		<button
			onclick={() => scrollToSection('about-section')}
			class="mt-8 hover:scale-110 transition-transform duration-200"
			aria-label="Scroll to About Section"
		>
			<svg
				class="h-6 w-6 text-blue-200 hover:text-white transition-colors"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
	</div>
</section>

<!-- About IDEA Hacks Section -->
<section id="about-section" class="bg-white text-gray-800 py-20 px-6">
	<div class="max-w-4xl mx-auto">
		<h2 class="text-4xl font-bold text-center mb-8 text-gray-900">About IDEA Hacks</h2>
		<div class="prose prose-lg mx-auto text-gray-700 leading-relaxed">
			<p class="mb-6">
				For the twelfth time, IEEE at UCLA is pleased to present IDEA Hacks, the largest hardware hackathon on the West Coast! We provide all our hackers with all the hardware, tools, and equipment that they need, including 3D printers and soldering stations, free of charge.
			</p>
			<p class="mb-6">
				Our hundreds of hackers will not only code, but create tangible products from scratch over the course of 36 hours.
			</p>
			<p class="mb-8">
				IEEE at UCLA is a branch of The Institute of Electrical and Electronics Engineers (IEEE) that aims to engage students through technical and professional involvement that reaches beyond the scope of their traditional coursework. We teach 5 year-long technical projects, actively engage in community and academic outreach, host an extensive workshop series, mentor and fund individual student projects, among many more social opportunities!
			</p>
		</div>
		<div class="text-center">
			<button
				onclick={() => scrollToSection('theme-section')}
				class="inline-block bg-custom-yellow text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200 hover:scale-105 transform"
			>
				Learn More About This Year's Event
			</button>
		</div>
	</div>
</section>

<!-- Theme Section -->
<section id="theme-section" class="bg-white text-gray-800 py-20 px-6">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-4xl font-bold text-center mb-4 text-gray-900">A Brighter Future</h2>
		<p class="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
			This year, we're illuminating the path forward with a spark of vision, hope, and innovation.
		</p>
		
		<div class="grid md:grid-cols-3 gap-8 mb-12">
			<div class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center hover:shadow-lg transition-shadow duration-200">
				<div class="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold mb-3 text-gray-900">Educate the Future</h3>
				<p class="text-gray-600">Design solutions that enhance general well-being and learning</p>
			</div>
			
			<div class="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl text-center hover:shadow-lg transition-shadow duration-200">
				<div class="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold mb-3 text-gray-900">Fashion the Future</h3>
				<p class="text-gray-600">Revive timeless classics with modern innovation</p>
			</div>
			
			<div class="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center hover:shadow-lg transition-shadow duration-200">
				<div class="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold mb-3 text-gray-900">Renovate the Future</h3>
				<p class="text-gray-600">Create something truly out-of-the-box and innovative</p>
			</div>
		</div>
		
		<div class="prose prose-lg mx-auto text-gray-700 leading-relaxed text-center">
			<p>
				Participants will choose one of these tracks to design unique solutions that enhance general well-being, revive timeless classics, or create something truly out-of-the-box. IDEA Hacks provides a platform for passionate individuals to showcase their skills and creativity, fostering collaboration and opening endless avenues of learning in a short space of time.
			</p>
		</div>
	</div>
</section>

<!-- Sponsor Benefits Section -->
<section class="bg-gray-50 text-gray-800 py-20 px-6">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-4xl font-bold text-center mb-4 text-gray-900">Why Sponsor IDEA Hacks?</h2>
		<p class="text-xl text-center text-gray-600 mb-12">
			Join us in supporting the next generation of innovators
		</p>
		
		<div class="grid md:grid-cols-3 gap-8">
			<div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
				<div class="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold mb-4 text-gray-900">Real-time User Testing</h3>
				<p class="text-gray-600 leading-relaxed">
					Hackathons facilitate real-time user testing of your product on hackers who fit the same demographic as your customers. Their input will provide invaluable data for what potential clients will experience when using your product. We also provide sponsors with options for branded company prizes and stage time at the opening ceremony.
				</p>
			</div>
			
			<div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
				<div class="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold mb-4 text-gray-900">Brand Recognition & Exposure</h3>
				<p class="text-gray-600 leading-relaxed">
					If you are looking to garner brand recognition or to demonstrate your company's technical side, then look no further. Companies love sponsoring IDEA Hacks because we provide exposure to a relevant audience - future customers and early adopters who will try new products and create with new technologies.
				</p>
			</div>
			
			<div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
				<div class="w-16 h-16 bg-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-bold mb-4 text-gray-900">Access to Top Talent</h3>
				<p class="text-gray-600 leading-relaxed">
					Our hackathon grants access to top technical talent from select universities through our rigorous application process. Not only are these students smart and talented, but their passion and drive motivates them to stay up 36 hours to construct a working product. These are the students that you want on your team.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Call to Action Section -->
<section class="bg-gradient-to-b from-blue-600 to-blue-500 text-white py-20 px-6">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-4xl font-bold mb-6">Ready to Sponsor IDEA Hacks?</h2>
		<p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
			Join us in supporting the next generation of innovators and gain valuable exposure to top technical talent at the largest hardware hackathon on the West Coast.
		</p>
		
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
			<a 
				href="mailto:corporate@ieeebruins.com"
				class="bg-custom-yellow text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-colors duration-200 hover:scale-105 transform"
			>
				Sponsor IDEA Hacks 2026
			</a>
			<a 
				href="mailto:corporate@ieeebruins.com"
				class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform"
			>
				Learn More About Sponsorship
			</a>
		</div>
		
		<div class="text-blue-200">
			<p class="text-lg font-semibold">corporate@ieeebruins.com</p>
		</div>
	</div>
</section>

<style>
	/* Custom animations and transitions */
	.prose {
		max-width: none;
	}
	
	/* Hover effects for interactive elements */
	button, a {
		transition: all 0.2s ease;
	}
	
	/* Ensure proper spacing and typography */
	section {
		scroll-margin-top: 2rem;
	}
</style>
