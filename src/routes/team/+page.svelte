<script>
	import TeamPanel from '$lib/components/TeamPanel.svelte';

	// DIRECTORS
	const director_panel_info = {
		title: 'DIRECTORS',
		officers: [
			{
				name: 'THEO ZHANG',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/theozhang_cat.png'
			},
			{
				name: 'TAYLOR KAWATE',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/taylorkawate_cat.png'
			}
		]
	};

	// DESIGN
	const design_panel_info = {
		title: 'DESIGN',
		officers: [
			{
				name: 'JACE FANG',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/jacefang_cat.png'
			},
			{
				name: 'CLAIRE HUANG',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/clairehuang_cat.png'
			},
			{
				name: 'SHUDI WANG',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/shudiwang_cat.png'
			}
		]
	};

	// FOOD
	const food_panel_info = {
		title: 'FOOD',
		officers: [
			{
				name: 'RACHEL YEN',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/rachelyen_cat.png'
			},
			{
				name: 'EUGENIA CHO',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/eugeniacho_cat.png'
			}
		]
	};

	// CORPORATE
	const corporate_panel_info = {
		title: 'CORPORATE',
		officers: [
			{
				name: 'EVAN BIRD',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/evanbird_cat.png'
			},
			{
				name: 'LAURA HUANG',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/laurahuang_cat.png'
			},
			{
				name: 'MATHEO IRAZABAL',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/matheoirazabal_cat.png'
			},
			{
				name: 'MIRIAM NYGREN',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/miriamnygren_cat.png'
			}
		]
	};

	const website_panel_info = {
		title: 'WEBSITE',
		officers: [
			{
				name: 'PAUL ZHANG',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/paulzhang_cat.png'
			},
			{
				name: 'BRANDON TRAN',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/brandontran_cat.png'
			},
			{
				name: 'SHANNON WANG',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/shannonwang_cat.png'
			},
			{
				name: 'KEVIN ZHANG',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/kevinzhang_cat.png'
			},
			{
				name: 'ETHAN LAI',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/ethanlai_cat.png'
			}
		]
	};

	const outreach_panel_info = {
		title: 'OUTREACH',
		officers: [
			{
				name: 'NATHAN NGUYENDINH',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/nathannguyendinh_cat.png'
			},
			{
				name: 'ELI FOERST',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/elifoerst_cat.png'
			},
			{
				name: 'AYAH KASHKOUL',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/ayahkashkoul_cat.png'
			},
			{
				name: 'JACQUELINE DUONG',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/jacquelineduong_cat.png'
			}
		]
	};

	const operations_panel_info = {
		title: 'OPERATIONS',
		officers: [
			{
				name: 'TIMOTHY JACQUES',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/timothyjacques_cat.png'
			},
			{
				name: 'MEGAN CHEN',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/meganchen_cat.png'
			},
			{
				name: 'SIDDHANT GUPTA',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/siddhantgupta_cat.png'
			},
			{
				name: 'BENJI CRUZ',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/benjicruz_cat.png'
			},
			{
				name: 'DOMINIC OLSON',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/dominicolson_cat.png'
			},
			{
				name: 'JESSICA CHANG',
				img_src: 'src/lib/images/officers/placeholder.png',
				cat_img_src: 'src/lib/images/officers/jessicachang_cat.png'
			}
		]
	};

	let allTeams = [
		director_panel_info,
		design_panel_info,
		food_panel_info,
		corporate_panel_info,
		website_panel_info,
		outreach_panel_info,
		operations_panel_info
	];
</script>

<img
	class="mx-auto w-3/4 max-w-screen-md"
	src="src/lib/images/logo-text.png"
	alt="ideahacks logo"
/>

{#each allTeams as teamInfo}
	<TeamPanel {teamInfo} />
{/each}

<style lang="postcss">
	:global(body) {
		background: linear-gradient(
			180deg,
			#240202 0%,
			#70130b 18.75%,
			#a53018 44.27%,
			#d97e2e 71.35%,
			#f6c042 95.83%
		);
	}
</style>
