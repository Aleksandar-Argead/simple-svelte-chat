import type { Message } from "$lib/models/Message";

export async function fetchMessage(id: number): Promise<Message> {
  try {
    const response = await fetch(`https://dummyjson.com/comments/${id}`);

    const data = (await response.json()).body;

    return { id: Date.now().toString(), data, userId: "partner" };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export function saveMessages(messages: Message[]): void {
  localStorage.setItem("messages", JSON.stringify(messages));
}

export function loadMessages(): Message[] {
  const savedMessages = localStorage.getItem("messages");
  return savedMessages ? JSON.parse(savedMessages) : [];
}
