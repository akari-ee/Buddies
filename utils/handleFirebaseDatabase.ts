import axios from 'axios';

export const saveChatHistoryInToFirebaseDatabase = async (
  email: string,
  character: string,
  chat: any
) => {
  try {
    const res = await fetch(
      'http://localhost:3000/api/firebase/saveChatHistory',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: chat, email: email, prompt: character }),
      }
    );
    const data = await res.json();
    console.log('Chat Insert Result: ', data);
  } catch (e) {
    console.log('Chat Insert Error! ', e);
  }
};

export const saveCompletionInToFirebaseDatabase = async (
  email: string,
  character: string,
  completion: string
) => {
  try {
    const res = await fetch(
      'http://localhost:3000/api/firebase/saveCompletion',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completion: completion, email: email, prompt: character}),
      }
    );
    const data = await res.json();
    console.log('Completion Insert Result: ', data);
  } catch (e) {
    console.log('Completion Insert Error! ', e);
  }
};
