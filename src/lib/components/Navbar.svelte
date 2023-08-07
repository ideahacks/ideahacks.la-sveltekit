<div class="navbar bg-red-950 font-display-sans">
	<!-- Mobile navbar -->
	<div class="navbar-start">
		<!-- HAMBURGER MENU -->
		<details class="dropdown">
			<summary class="btn-ghost btn md:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</summary>
			<ul class="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow">
				<li class="py-0">
					<a href="/about">ABOUT</a>
					<ul class="ml-4 bg-red-950">
						<li class="hover:"><a href="/venue">VENUE</a></li>
						<li><a href="/team">TEAM</a></li>
						<li><a href="/history">HISTORY</a></li>
					</ul>
				</li>
				<li><a href="/schedule">SCHEDULE</a></li>
				<li><a href="/faq">FAQ</a></li>
				<li><a href="/sponsors">SPONSORS</a></li>
			</ul>
		</details>
		<img class="w-12" src="src/lib/images/ideahacks_logo.png" alt="ideahacks" />
	</div>

	<!-- Desktop navbar -->
	<div class="navbar-center hidden md:flex">
		<ul class="menu menu-horizontal px-1">
			<li>
				<details>
					<summary class="m-1 bg-red-950">ABOUT</summary>
					<ul class="dropdown-content menu rounded-box menu-sm z-[1] mt-3 bg-red-950 p-2 shadow">
						<li><a href="/venue">VENUE</a></li>
						<li><a href="/team">TEAM</a></li>
						<li><a href="/history">HISTORY</a></li>
					</ul>
				</details>
			</li>
			<li><a href="/schedule">SCHEDULE</a></li>
			<li><a href="/faq">FAQ</a></li>
			<li><a href="/sponsors">SPONSORS</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		<a href="/login" class="btn-ghost btn p-2 text-yellow-500 hover:bg-black">LOGIN</a>
	</div>
</div>
