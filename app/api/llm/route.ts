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
import dayjs from 'dayjs';

export const runtime = 'edge';

const characters = ['spring', 'summer', 'autumn', 'winter'];
/* 1~3은 유저 당 한번만 실행되면 된다. */
// API Key 설정
const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  streaming: true,
});

// 1) Prompt Templates

// 2) Memory
const memory = new ConversationSummaryBufferMemory({
  llm: chatModel,
  memoryKey: "chat_history",
  maxTokenLimit: 2000,
  returnMessages: true,
});

// 3) LLM
const spring = new LLMChain({
  llm: chatModel,
  prompt: promptSpring,
});

const summer = new LLMChain({
  llm: chatModel,
  prompt: promptSummer,
});

const autumn = new LLMChain({
  llm: chatModel,
  prompt: promptAutumn,
  verbose: true,
  memory: memory,
});

const winter = new LLMChain({
  llm: chatModel,
  prompt: promptWinter,
});

const llms = {
  spring: spring,
  summer: summer,
  autumn: autumn,
  winter: winter,
};

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
