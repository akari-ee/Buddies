import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  LangChainStream,
} from 'ai';
import { llms } from '@/config/langchain';
import { AIMessage, HumanMessage } from 'langchain/schema';
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
  const { email, characterId, messages } = await request.json();
  const currentMessageContent = messages[messages.length - 1].content;
  const characterName = characters[characterId];

  const { stream, handlers } = LangChainStream({
    onStart: async () => {
      await saveChatHistoryInToFirebaseDatabase(email, '가으리', messages);
    },
    onCompletion: async (completion: string) => {
      await saveCompletionInToFirebaseDatabase(email, '가으리', completion);
    },
  });

  // Must be called without await
  // input object must be passed first
  llms[characterName].call(
    {
      input: currentMessageContent,
    },
    (messages as Message[]).map((m: any) =>
      m.role === 'assistant'
        ? new AIMessage(m.content)
        : new HumanMessage(m.content)
    ),
    [handlers]
  );

  return new StreamingTextResponse(stream);
}
