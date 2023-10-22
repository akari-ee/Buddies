import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ConversationSummaryBufferMemory } from 'langchain/memory';
import { LLMChain } from 'langchain/chains';
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

export const llms = {
  spring: spring,
  summer: summer,
  autumn: autumn,
  winter: winter,
};