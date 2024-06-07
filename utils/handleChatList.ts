import dayjs from 'dayjs';
import { randomBytes, randomUUID } from 'crypto';
import { Message } from 'ai';

export const handleChatList = (chatList: any[]) => {
  let initialMessages: Message[] = [];
  chatList.forEach((chat) => {
    if (chat.user) {
      for (let [index, el] of chat.user.entries()) {
        initialMessages.push({
          id: randomBytes(16).toString('hex'),
          role: el.role,
          content: el.content,
          createdAt: new Date(el.timestamp),
        });
        if (chat.gpt && index < chat.gpt.length) {
          initialMessages.push({
            id: randomBytes(16).toString('hex'),
            role: chat.gpt[index].role,
            content: chat.gpt[index].content,
            createdAt: new Date(chat.gpt[index].timestamp),
          });
        }
      }
    }
  });
  return initialMessages;
};
