import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
// uid, cid 필요
// `Users/${uid}/ChatHistory/모든 날짜 문서/프롬프트`,
// 날짜 형식: dayjs().format('YY-MM-DD')
const ch = ['보미', '여르미', '가으리', '겨우리'];

export async function POST(req: NextRequest) {
  const { email, characterId } = await req.json();
  let chatList: any = [];
  const chatSnap = await getDocs(collection(db, `Users/${email}/ChatHistory`));
  console.log(chatSnap.size);
  const promises = chatSnap.docs.map(async (sub) => {
    // sub = ChatHistory의 하위 문서(Document)를 의미한다.
    const promptSnap = await getDocs(
      collection(
        db,
        `Users/${email}/ChatHistory/${sub.id}/${ch[Number(characterId)]}`
      )
    ); // sub.id = 날짜, 해당 날짜에서 사용한 캐릭터(챗봇)와의 대화내용을 가져온다.
    promptSnap.forEach((sub) => {
      // sub2.id = 캐릭터 이름, sub2.data() = 캐릭터와의 대화내용
      chatList.push(sub.data());
    });
  });

  await Promise.all(promises); // 모든 프로미스가 끝날 때까지 기다린다.(비동기 처리)
  return NextResponse.json({ data: chatList });
}
