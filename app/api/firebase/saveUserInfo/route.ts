import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

// Firestore에 첫 로그인한 유저 정보 저장하기.
export async function POST(req: any) {
  const res = await req.json();
  console.log(res.data);
  try {
    const existedUserRef = doc(db, 'Users', res.data.uid);
    const existedUserSnap = await getDoc(existedUserRef);
    if (existedUserSnap.exists()) {
      return NextResponse.json({ message: 'Firestore User already exists!' });
    } else {
      await setDoc(doc(db, 'Users', res.data.uid), res.data);
      return NextResponse.json({ message: 'Firestore User Saving SUCCESS!' });
    }
  } catch (e) {
    return NextResponse.json({
      message: 'Firestore User Saving ERROR!',
      errorMessage: e,
    });
  }
}
