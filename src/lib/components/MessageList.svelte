<script lang="ts">
	import type { Message } from '$lib/models/Message';
	import { afterUpdate } from 'svelte';

	export let users;
	export let container: HTMLDivElement;
	export let messages: Message[];

	afterUpdate(() => container.scrollTo(0, container.scrollHeight));
</script>

<div class="flex-grow flex flex-col justify-end overflow-hidden">
	<ul
		role="log"
		aria-live="polite"
		id="chat-container"
		bind:this={container}
		class="flex flex-col scroll-smooth overflow-y-auto p-4 space-y-4"
	>
		{#each messages as message (message.id)}
			<li
				id={`message-${message.id}`}
				class:flex-row-reverse={message.userId === 'user'}
				class="p-2 flex items-start gap-x-2"
			>
				<img
					src={users[message.userId].profilePic}
					alt="User avatar"
					class="w-10 h-10 rounded-full"
				/>
				<span
					class="flex p-3 rounded-2xl"
					class:bg-green-100={message.userId === 'user'}
					class:bg-blue-100={message.userId === 'partner'}>{message.data}</span
				>
			</li>
		{/each}
	</ul>
</div>
