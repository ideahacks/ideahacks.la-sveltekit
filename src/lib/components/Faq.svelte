<script>
	export let question = 'FAQ';
	export let answer = 'Answers to common questions about IDEA Hacks';
</script>

<div class="collapse collapse-arrow mb-4 bg-base-200 bg-opacity-10">
	<input type="checkbox" name="my-accordion-2" />
	<div class="collapse-title font-encode font-semibold xl:text-lg">{question}</div>
	<div class="collapse-content font-encode text-base xl:text-lg">
		<p>
			{answer}
		</p>
	</div>
</div>
