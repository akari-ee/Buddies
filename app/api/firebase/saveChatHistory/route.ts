import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import dayjs from 'dayjs';

export async function POST(req: NextRequest) {
  const { data, uid, prompt } = await req.json();
  const todayDate = dayjs().format('YY-MM-DD');
  const curTime = dayjs().format('HH');
  const chatRef = doc(
    db,
    `Users/${uid}/ChatHistory/${todayDate}/${prompt}`,
    curTime
  ); // ChatHistory 컬렉션 가져오고, 날짜로 문서 이름 설정
  const chatSnap = await getDoc(chatRef);
    console.log(data.createdAt);
  if (chatSnap.exists()) {
    // 있으면 기존 문서에 대화 기록 추가
    data[data.length - 1]['timestamp'] = dayjs().format('YYYY-MM-DD HH:mm:ss');
    await updateDoc(
      doc(db, `Users/${uid}/ChatHistory/${todayDate}/${prompt}`, curTime),
      {
        user: arrayUnion(data[data.length - 1]),
      }
    );
    return NextResponse.json({
      message: 'Firestore ChatHistory Saving SUCCESS!',
    });
  } else {
    await setDoc(
      doc(db, `Users/${uid}/ChatHistory/${todayDate}/${prompt}`, curTime),
      {
        user: [data[data.length - 1]],
      }
    );
    return NextResponse.json({ message: 'Firestore Chat Saving SUCCESS!' });
  }
  return NextResponse.json({ message: 'Firestore Chat Saving Failed!' });
}
