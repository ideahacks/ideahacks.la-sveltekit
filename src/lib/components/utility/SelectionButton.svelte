<script lang="ts">
	interface Props {
		text?: string;
		onClick?: () => void;
		className?: string;
	}
	let { text = '', onClick = () => {}, className = '' }: Props = $props();
</script>

<button
	type="button"
	class="interactive-element hover-lift rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 font-mono text-sm {className}"
	onclick={onClick}
>
	{text}
</button>
