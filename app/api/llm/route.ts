import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  LangChainStream,
} from 'ai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { llms } from '@/config/langchain';
import {
  saveChatHistoryInToFirebaseDatabase,
  saveCompletionInToFirebaseDatabase,
} from '@/utils/handleFirebaseDatabase';

export const runtime = 'edge';

const characters = ['spring', 'summer', 'autumn', 'winter'];

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
export async function POST(request: Request) {
  const { email, characterId, messages, initialMessages } =
    await request.json();
  const currentMessageContent = messages[messages.length - 1].content;
  const characterName = characters[characterId];

  const outputParser = new BytesOutputParser();

  const { stream, handlers } = LangChainStream({
    onStart: async () => {
      await saveChatHistoryInToFirebaseDatabase(email, '가으리', messages);
    },
    onCompletion: async (completion: string) => {
      console.log('onCompletion: ', completion);
      await saveCompletionInToFirebaseDatabase(email, '가으리', completion);
    },
  });
  // must call without await
  // 동작
  llms[characterName].run(currentMessageContent, [handlers]).then((res) => console.log('run result: ', res));

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
