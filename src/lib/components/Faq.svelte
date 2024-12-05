<script>
	export let question = 'FAQ';
	export let answer = 'Answers to common questions about IDEA Hacks';
</script>

<div class="collapse collapse-arrow mb-4 bg-base-200 bg-opacity-20">
	<input type="radio" name="my-accordion-2" />
	<div class="collapse-title font-paytone text-xl font-medium">{question}</div>
	<div class="collapse-content font-mono">
		<p>
			{answer}
		</p>
	</div>
</div>
