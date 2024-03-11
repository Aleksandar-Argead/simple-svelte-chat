<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	let message: string = '';
	let input: HTMLInputElement;

	function sendMessage() {
		if (message.trim()) {
			dispatch('send', message);
			message = '';
			input.focus();
		}
	}

	onMount(() => {
		input.focus();
	});
</script>

<form class="flex p-3 space-x-2" on:submit|preventDefault={sendMessage}>
	<input
		type="text"
		bind:value={message}
		bind:this={input}
		class="flex-grow p-2 border rounded-lg overflow-scroll border-blue-500"
		placeholder="Say something..."
	/>
	<button type="submit" class="p-2 px-6 bg-blue-500 text-white rounded-lg">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
			/>
		</svg>
	</button>
</form>
