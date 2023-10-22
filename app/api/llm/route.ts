import { OpenAI } from 'langchain/llms/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ConversationSummaryBufferMemory } from 'langchain/memory';
import { ConversationChain, LLMChain } from 'langchain/chains';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from 'langchain/prompts';

import {
  promptSpring,
  promptSummer,
  promptAutumn,
  promptWinter,
} from '@/config/prompts';

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
  
}