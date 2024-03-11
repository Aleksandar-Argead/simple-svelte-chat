<script lang="ts">
	import type { Message } from '$lib/models/Message';
	import type { User } from '$lib/models/User';
	import { afterUpdate, onMount, tick } from 'svelte';

	export let users: User[];
	export let container: HTMLUListElement;
	export let messages: Message[] = [];

	afterUpdate(() => {
		requestAnimationFrame(async () => {
			await tick();
			container.scrollTo(0, container.scrollHeight);
		});
	});
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
					src={users.find((user) => user.id === message.userId)?.profilePictureUrl}
					alt="User avatar"
					class="w-10 h-10 rounded-full"
				/>
				<span
					class="flex p-3 rounded-2xl"
					class:bg-amber-100={message.userId === 'user'}
					class:bg-slate-100={message.userId === 'partner'}>{message.data}</span
				>
			</li>
		{/each}
	</ul>
</div>
