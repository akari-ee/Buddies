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
import { randomBytes, randomUUID } from 'crypto';

// Firestore에 첫 로그인한 유저 정보 저장하기.
export async function POST(req: any) {
  const res = await req.json();
  let email = res.data.email;
  console.log('email is: ', email);
  if (email === undefined || email === null || email.length === 0) {
    email = randomUUID() + '@anonymous.com';
  }
  try {
    const existedUserRef = doc(db, 'Users', email); // Users라는 컬렉션에 email 문서
    const existedUserSnap = await getDoc(existedUserRef);
    if (existedUserSnap.exists()) {
      return NextResponse.json({ message: 'Firestore User already exists!' });
    } else {
      await setDoc(doc(db, 'Users', email), res.data);
      return NextResponse.json({ message: 'Firestore User Saving SUCCESS!' });
    }
  } catch (e) {
    return NextResponse.json({
      message: 'Firestore User Saving ERROR!',
      errorMessage: e,
    });
  }
}
