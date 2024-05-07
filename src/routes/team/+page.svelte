<script>
	import TeamPanel from '$lib/components/TeamPanel.svelte';
	import logoText from '$lib/images/logo-text.png';

	import theozhang from '$lib/images/officers/theozhang.jpg';
	import taylorkawate from '$lib/images/officers/taylorkawate.jpg';
	import jacefang from '$lib/images/officers/jacefang.jpg';
	import clairehuang from '$lib/images/officers/clairehuang.jpg';
	// import shudiwang from '$lib/images/officers/shudiwang.jpg';
	import rachelyen from '$lib/images/officers/rachelyen.jpg';
	// import eugeniacho from '$lib/images/officers/eugeniacho.jpg';
	import evanbird from '$lib/images/officers/evanbird.jpg';
	// import laurahuang from '$lib/images/officers/laurahuang.jpg';
	// import matheoirazabal from '$lib/images/officers/matheoirazabal.jpg';
	import miriamnygren from '$lib/images/officers/miriamnygren.jpg';
	import paulzhang from '$lib/images/officers/paulzhang.jpg';
	// import brandontran from '$lib/images/officers/brandontran.jpg';
	import shannonwang from '$lib/images/officers/shannonwang.jpg';
	import kevinzhang from '$lib/images/officers/kevinzhang.jpg';
	// import ethanlai from '$lib/images/officers/ethanlai.jpg';
	import nathannguyendinh from '$lib/images/officers/nathannguyendinh.jpg';
	import elifoerst from '$lib/images/officers/elifoerst.jpg';
	import ayahkashkoul from '$lib/images/officers/ayahkashkoul.jpg';
	import jacquelineduong from '$lib/images/officers/jacquelineduong.jpg';
	import timothyjacques from '$lib/images/officers/timothyjacques.jpg';
	import meganchen from '$lib/images/officers/meganchen.jpg';
	import siddhantgupta from '$lib/images/officers/siddhantgupta.jpg';
	import benjicruz from '$lib/images/officers/benjicruz.jpg';
	import dominicolson from '$lib/images/officers/dominicolson.jpg';
	// import jessicachang from '$lib/images/officers/jessicachang.jpg';

	import theozhang_cat from '$lib/images/officers/theozhang_cat.png';
	import taylorkawate_cat from '$lib/images/officers/taylorkawate_cat.png';
	import jacefang_cat from '$lib/images/officers/jacefang_cat.png';
	import clairehuang_cat from '$lib/images/officers/clairehuang_cat.png';
	import shudiwang_cat from '$lib/images/officers/shudiwang_cat.png';
	import rachelyen_cat from '$lib/images/officers/rachelyen_cat.png';
	import eugeniacho_cat from '$lib/images/officers/eugeniacho_cat.png';
	import evanbird_cat from '$lib/images/officers/evanbird_cat.png';
	import laurahuang_cat from '$lib/images/officers/laurahuang_cat.png';
	import matheoirazabal_cat from '$lib/images/officers/matheoirazabal_cat.png';
	import miriamnygren_cat from '$lib/images/officers/miriamnygren_cat.png';
	import paulzhang_cat from '$lib/images/officers/paulzhang_cat.png';
	import brandontran_cat from '$lib/images/officers/brandontran_cat.png';
	import shannonwang_cat from '$lib/images/officers/shannonwang_cat.png';
	import kevinzhang_cat from '$lib/images/officers/kevinzhang_cat.png';
	import ethanlai_cat from '$lib/images/officers/ethanlai_cat.png';
	import nathannguyendinh_cat from '$lib/images/officers/nathannguyendinh_cat.png';
	import elifoerst_cat from '$lib/images/officers/elifoerst_cat.png';
	import ayahkashkoul_cat from '$lib/images/officers/ayahkashkoul_cat.png';
	import jacquelineduong_cat from '$lib/images/officers/jacquelineduong_cat.png';
	import timothyjacques_cat from '$lib/images/officers/timothyjacques_cat.png';
	import meganchen_cat from '$lib/images/officers/meganchen_cat.png';
	import siddhantgupta_cat from '$lib/images/officers/siddhantgupta_cat.png';
	import benjicruz_cat from '$lib/images/officers/benjicruz_cat.png';
	import dominicolson_cat from '$lib/images/officers/dominicolson_cat.png';
	import jessicachang_cat from '$lib/images/officers/jessicachang_cat.png';

	// DIRECTORS
	const director_panel_info = {
		title: 'DIRECTORS',
		officers: [
			{
				name: 'THEO ZHANG',
				img_src: theozhang,
				cat_img_src: theozhang_cat
			},
			{
				name: 'TAYLOR KAWATE',
				img_src: taylorkawate,
				cat_img_src: taylorkawate_cat
			}
		]
	};

	// DESIGN
	const design_panel_info = {
		title: 'DESIGN',
		officers: [
			{
				name: 'JACE FANG',
				img_src: jacefang,
				cat_img_src: jacefang_cat
			},
			{
				name: 'CLAIRE HUANG',
				img_src: clairehuang,
				cat_img_src: clairehuang_cat
			},
			{
				name: 'SHUDI WANG',
				img_src: '',
				cat_img_src: shudiwang_cat
			}
		]
	};

	// FOOD
	const food_panel_info = {
		title: 'FOOD',
		officers: [
			{
				name: 'RACHEL YEN',
				img_src: rachelyen,
				cat_img_src: rachelyen_cat
			},
			{
				name: 'EUGENIA CHO',
				img_src: '',
				cat_img_src: eugeniacho_cat
			}
		]
	};

	// CORPORATE
	const corporate_panel_info = {
		title: 'CORPORATE',
		officers: [
			{
				name: 'EVAN BIRD',
				img_src: evanbird,
				cat_img_src: evanbird_cat
			},
			{
				name: 'LAURA HUANG',
				img_src: '',
				cat_img_src: laurahuang_cat
			},
			{
				name: 'MATHEO IRAZABAL',
				img_src: '',
				cat_img_src: matheoirazabal_cat
			},
			{
				name: 'MIRIAM NYGREN',
				img_src: miriamnygren,
				cat_img_src: miriamnygren_cat
			}
		]
	};

	// WEBSITE
	const website_panel_info = {
		title: 'WEBSITE',
		officers: [
			{
				name: 'PAUL ZHANG',
				img_src: paulzhang,
				cat_img_src: paulzhang_cat
			},
			{
				name: 'BRANDON TRAN',
				img_src: '',
				cat_img_src: brandontran_cat
			},
			{
				name: 'SHANNON WANG',
				img_src: shannonwang,
				cat_img_src: shannonwang_cat
			},
			{
				name: 'KEVIN ZHANG',
				img_src: kevinzhang,
				cat_img_src: kevinzhang_cat
			},
			{
				name: 'ETHAN LAI',
				img_src: '',
				cat_img_src: ethanlai_cat
			}
		]
	};

	// OUTREACH
	const outreach_panel_info = {
		title: 'OUTREACH',
		officers: [
			{
				name: 'NATHAN NGUYENDINH',
				img_src: nathannguyendinh,
				cat_img_src: nathannguyendinh_cat
			},
			{
				name: 'ELI FOERST',
				img_src: elifoerst,
				cat_img_src: elifoerst_cat
			},
			{
				name: 'AYAH KASHKOUL',
				img_src: ayahkashkoul,
				cat_img_src: ayahkashkoul_cat
			},
			{
				name: 'JACQUELINE DUONG',
				img_src: jacquelineduong,
				cat_img_src: jacquelineduong_cat
			}
		]
	};

	// OPERATIONS
	const operations_panel_info = {
		title: 'OPERATIONS',
		officers: [
			{
				name: 'TIMOTHY JACQUES',
				img_src: timothyjacques,
				cat_img_src: timothyjacques_cat
			},
			{
				name: 'MEGAN CHEN',
				img_src: meganchen,
				cat_img_src: meganchen_cat
			},
			{
				name: 'SIDDHANT GUPTA',
				img_src: siddhantgupta,
				cat_img_src: siddhantgupta_cat
			},
			{
				name: 'BENJI CRUZ',
				img_src: benjicruz,
				cat_img_src: benjicruz_cat
			},
			{
				name: 'DOMINIC OLSON',
				img_src: dominicolson,
				cat_img_src: dominicolson_cat
			},
			{
				name: 'JESSICA CHANG',
				img_src: '',
				cat_img_src: jessicachang_cat
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

<img class="mx-auto w-3/4 max-w-screen-md" src={logoText} alt="ideahacks logo" />

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
