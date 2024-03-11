<script lang="ts">
	import { onMount } from 'svelte';
	import type { Message } from '$lib/models/Message';
	import MessageList from '$lib/components/MessageList.svelte';
	import MessageForm from '$lib/components/MessageForm.svelte';
	import { loadMessages, saveMessages, fetchMessage } from '$lib/services/MessageService';
	import MessageHeader from '$lib/components/MessageHeader.svelte';

	let messages: Message[] = [];
	let container: HTMLDivElement;

	const users = {
		user: { name: 'Chris', profilePic: 'https://i.pravatar.cc/150?img=8' },
		partner: { name: 'Holly', profilePic: 'https://i.pravatar.cc/150?img=1' }
	};

	onMount(() => {
		messages = loadMessages();
	});

	function addMessage(message: Message) {
		messages = [...messages, message];
		saveMessages(messages);
	}

	async function handleSend(event) {
		const newMessage: Message = { id: Date.now().toString(), data: event.detail, userId: 'user' };

		addMessage(newMessage);
		await mockReply();
	}

	async function mockReply() {
		try {
			const message = await fetchMessage(Math.floor(Math.random() * 340) + 1);
			addMessage(message);
		} catch (error) {
			console.error('Error fetching mock reply:', error);
		}
	}

	function handleClear() {
		messages = [];
		saveMessages(messages);
	}
</script>

<main class="flex justify-between flex-col h-screen flex-grow md:border max-w-xl">
	<MessageHeader partner={users['partner']} on:clear={handleClear} />
	<MessageList {messages} {users} {container} />
	<MessageForm on:send={handleSend} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
</style>
