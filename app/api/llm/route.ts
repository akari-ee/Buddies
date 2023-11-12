import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatMessageHistory,
  ConversationSummaryBufferMemory,
} from 'langchain/memory';
import { ConversationChain, LLMChain } from 'langchain/chains';
import { CallbackManager } from 'langchain/callbacks';
import {
  promptSpring,
  promptSummer,
  promptAutumn,
  promptWinter,
} from '@/config/prompts';
import { NextResponse } from 'next/server';
import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  LangChainStream,
  OpenAIStream,
} from 'ai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';
import { chatModel, llms } from '@/config/langchain';
import dayjs from 'dayjs';
import { AIMessage, ChainValues, HumanMessage } from 'langchain/schema';
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
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

export async function POST(request: Request) {
  const { email, characterId, messages, initialMessages } =
    await request.json();
  const currentMessageContent = messages[messages.length - 1].content;
  const characterName = characters[characterId];

  const { stream, handlers } = LangChainStream({
    onStart: async () => {
      await saveChatHistoryInToFirebaseDatabase(email, '가으리', messages);
    },
    onCompletion: async (completion: string) => {
      console.log('onCompletion: ', completion);
      await saveCompletionInToFirebaseDatabase(email, '가으리', completion);
    },
  });

  llms[characterName].run(currentMessageContent, [handlers]);

  // must call without await
  llms[characterName]
    .call(
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
