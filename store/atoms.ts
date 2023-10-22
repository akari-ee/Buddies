import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const promptState = atom({
  key: 'promptState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const chatState = atom({
  key: 'chatState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});