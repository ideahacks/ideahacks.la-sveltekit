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
</script>

<img
	class="mx-auto w-3/4 max-w-screen-md"
	src="src/lib/images/logo-text.png"
	alt="ideahacks logo"
/>

<TeamPanel teamInfo={director_panel_info} />
<TeamPanel teamInfo={design_panel_info} />
<TeamPanel teamInfo={food_panel_info} />
<TeamPanel teamInfo={corporate_panel_info} />

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
