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
import dayjs from 'dayjs';

const characters = ['spring', 'summer', 'autumn', 'winter'];
/* 1~3은 유저 당 한번만 실행되면 된다. */
// API Key 설정
const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// 1) Prompt Templates

// 2) Memory
const memory = new ConversationSummaryBufferMemory({
  llm: chatModel,
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

// 4) Test
// const character = 'spring';
// const text = '안녕하세요';
// export const answer = llms[character].predict({
//   text: text,
// });
export async function POST(request: Request) {
  const { user, characterId } = await request.json();
  const characterName = characters[characterId];

  const response = await llms[characterName].predict({
    text: user,
  });

  const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const role = 'assistant';
  const id = crypto.randomUUID();

  return NextResponse.json({
    id: id,
    role: role,
    content: response,
    createdAt: createdAt,
  });
}
