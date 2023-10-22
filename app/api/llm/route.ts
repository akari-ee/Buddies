import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ConversationSummaryBufferMemory } from 'langchain/memory';
import { LLMChain } from 'langchain/chains';
import {
  promptSpring,
  promptSummer,
  promptAutumn,
  promptWinter,
} from '@/config/prompts';
import { NextResponse } from 'next/server';
import { Message as VercelChatMessage, StreamingTextResponse, LangChainStream } from 'ai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';
import { llms } from '@/config/langchain';
import dayjs from 'dayjs';

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
  // const body = await request.json();
  // const messages = body.messages ?? [];
  // const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  // const currentMessageContent = messages[messages.length - 1].content;
  // const id = body.characterId;
  // const characterName = characters[id];

  const { user, characterId } = await request.json();
  const characterName = characters[characterId];
  // const { stream, handlers } = LangChainStream();
  const response = await llms[characterName].predict({
    text: user,
  });
  

  // const outputParser = new BytesOutputParser();
  // const chain = autumn.pipe(outputParser);

  // console.log('hwisik: ', chain);
  
  const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const role = 'assistant';
  const id = crypto.randomUUID();

  return NextResponse.json({
    id: id,
    role: role,
    content: response,
    createdAt: createdAt,
  });

  // const stream = await chain.stream({
  //   chat_history: formattedPreviousMessages.join('\n'),
  //   input: currentMessageContent,
  // });

  // return new StreamingTextResponse(stream);
}
