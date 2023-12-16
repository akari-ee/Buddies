import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  LangChainStream,
} from 'ai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { chatModel, llms } from '@/config/langchainModel';
import {
  saveChatHistoryInToFirebaseDatabase,
  saveCompletionInToFirebaseDatabase,
} from '@/utils/handleFirebaseDatabase';
import { ConversationChain } from 'langchain/chains';
import { promptAutumn } from '@/config/prompts';
import {
  ChatMessageHistory,
  ConversationSummaryBufferMemory,
} from 'langchain/memory';

import { HumanMessage, AIMessage } from 'langchain/schema';

export const runtime = 'edge';

const characters = ['spring', 'summer', 'autumn', 'winter'];

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
// messages : 이전 대화 기록을 가지고 있다. 현재 요청을 보낸 유저의 대화가 마지막으로 들어가므로, slice(:-1)을 통해 마지막 대화를 제외한 이전 대화 기록을 가져온다.
// messages의 형태(배열)
// { role: 'user', content: '안녕?' },
// { role: 'assistant', content: '안녕하세요! 어떤 일로 저에게 도움을 원하시나요?' },
// { role: 'user', content: '안녕?' },

// initialMessages: messages와 동일하다. 단, body를 통해 보내야하는 값이다. 근데 messages가 있으므로 body로 보낼 필요가 없다.
// initialMessages의 형태(배열)
// {
//   id: '3b44dbffb808d1d25bea7e6ecc3f94c6',
//   role: 'user',
//   content: '안녕?',
//   createdAt: '2023-12-16T08:28:07.000Z'
// }
export async function POST(request: Request) {
  const { email, characterId, messages } = await request.json();
  const currentMessageContent = messages[messages.length - 1].content;
  const characterName = characters[characterId];
  const formattedMessages = await messages.map((m: any) => {
    if (m.role === 'assistant') {
      return new AIMessage(m.content);
    } else {
      return new HumanMessage(m.content);
    }
  });

  const memory = new ConversationSummaryBufferMemory({
    llm: chatModel,
    memoryKey: 'chat_history',
    chatHistory: new ChatMessageHistory(formattedMessages), // TODO: load from firebase
    maxTokenLimit: 2000,
    returnMessages: true,
  });

  const autumn = new ConversationChain({
    llm: chatModel,
    prompt: promptAutumn,
    verbose: true,
    memory: memory,
  });

  const { stream, handlers } = LangChainStream({
    onStart: async () => {
      await saveChatHistoryInToFirebaseDatabase(email, '가으리', messages);
    },
    onCompletion: async (completion: string) => {
      await saveCompletionInToFirebaseDatabase(email, '가으리', completion);
    },
  });
  // must call without await
  // 동작
  autumn.run(currentMessageContent, [handlers]);
  // .then((res) => console.log('run result: ', res));

  // must call without await
  // 동작안함..
  // llms[characterName]
  //   .call(
  //     {
  //       input: currentMessageContent,
  //     },
  //     (messages as Message[]).map((m: any) =>
  //       m.role === 'assistant'
  //         ? new AIMessage(m.content)
  //         : new HumanMessage(m.content)
  //     ),
  //     [handlers]
  //   ).then((res : any) => {
  //     console.log('response is: ', res);
  //   })

  return new StreamingTextResponse(stream);
}
