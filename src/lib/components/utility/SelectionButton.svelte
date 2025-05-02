<script>
	export let text = '';
	export let onClick = () => {
		console.log('You found an easter egg!');
	};
	export let className = '';

	/**
	 * @type {HTMLSpanElement}
	 */
	let rippleElement;

	/**
	 * @param {{ currentTarget: { getBoundingClientRect: () => any; appendChild: (arg0: HTMLSpanElement) => void; }; clientX: number; clientY: number; }} event
	 */
	function handleClick(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		// Reset ripple
		if (rippleElement) {
			rippleElement.remove();
		}

		// Create new ripple
		rippleElement = document.createElement('span');
		rippleElement.classList.add('ripple');
		rippleElement.style.left = `${x}px`;
		rippleElement.style.top = `${y}px`;

		event.currentTarget.appendChild(rippleElement);

		// Remove ripple after animation
		setTimeout(() => {
			if (rippleElement) {
				rippleElement.remove();
			}
		}, 600);

		onClick();
	}
</script>

<button
	class="{className} interactive-element hover-lift btn my-1 rounded-full bg-base-200 bg-opacity-10 text-white hover:bg-base-200 hover:bg-opacity-60"
	on:click={handleClick}
>
	{text}
</button>
