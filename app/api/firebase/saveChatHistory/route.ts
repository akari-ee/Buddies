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
  const { data, email, prompt } = await req.json();
  if (email === undefined || email.length === 0 || email === null) {
    return NextResponse.json({
      message: 'Firestore Chat Saving Failed! User is Anonymous!',
    });
  }
  const todayDate = dayjs().format('YY-MM-DD');
  const curTime = dayjs().format('HH');

  const dateRef = doc(db, `Users/${email}/ChatHistory`, todayDate);
  const dateSnap = await getDoc(dateRef);

  if (!dateSnap.exists()) {
    await setDoc(doc(db, `Users/${email}/ChatHistory`, todayDate), {
      available: true,
    });
  }

  const chatRef = doc(
    db,
    `Users/${email}/ChatHistory/${todayDate}/${prompt}`,
    curTime
  ); // ChatHistory 컬렉션 가져오고, 날짜로 문서 이름 설정
  data[data.length - 1]['timestamp'] = dayjs().format('YYYY-MM-DD HH:mm:ss');

  const chatSnap = await getDoc(chatRef); // 해당 문서를 읽어옴
  console.log(data.createdAt);
  if (chatSnap.exists()) {
    // 문서가 존재한다면, 해당 문서에 데이터를 업데이트한다.
    await updateDoc(
      doc(db, `Users/${email}/ChatHistory/${todayDate}/${prompt}`, curTime),
      {
        user: arrayUnion(data[data.length - 1]),
      }
    );
    return NextResponse.json({
      message: 'Firestore ChatHistory Saving SUCCESS!',
    });
  } else {
    // 문서가 존재하지 않는다면, 해당 문서를 새로 만들고 데이터를 추가한다.
    await setDoc(
      doc(db, `Users/${email}/ChatHistory/${todayDate}/${prompt}`, curTime),
      {
        user: [data[data.length - 1]],
      }
    );
    return NextResponse.json({ message: 'Firestore Chat Saving SUCCESS!' });
  }
  return NextResponse.json({ message: 'Firestore Chat Saving Failed!' });
}
