import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ChatMessageHistory, ConversationSummaryBufferMemory } from 'langchain/memory';
import { ConversationChain, LLMChain } from 'langchain/chains';
import {
  promptSpring,
  promptSummer,
  promptAutumn,
  promptWinter,
} from '@/config/prompts';

// 인덱스 시그니처
interface Chain {
  [key: string]: LLMChain | ConversationChain;
}

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
  chatHistory: new ChatMessageHistory(),
  maxTokenLimit: 2000,
  returnMessages: true,
});

// 3) LLM

// Spring LLM
const spring = new LLMChain({
  llm: chatModel,
  prompt: promptSpring,
});

// Summer LLM
const summer = new LLMChain({
  llm: chatModel,
  prompt: promptSummer,
});

// Autumn Conversation
const autumn = new ConversationChain({
  llm: chatModel,
  prompt: promptAutumn,
  verbose: true,
  memory: memory,
});

// Winter LLM
const winter = new LLMChain({
  llm: chatModel,
  prompt: promptWinter,
});

export const llms: Chain = {
  spring: spring,
  summer: summer,
  autumn: autumn,
  winter: winter,
};