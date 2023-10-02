import { db } from '@/config/firebase';
import { collection, collectionGroup, getDocs } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

// uid, cid 필요
// `Users/${uid}/ChatHistory/모든 날짜 문서/프롬프트`,
// 날짜 형식: dayjs().format('YY-MM-DD')

// 챗봇 사용량을 가져온다.
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  let chatUsage: any = {
    '보미': 0,
    '여르미': 0,
    '가으리': 0,
    '겨우리': 0,
  };

  const chatSnap = await getDocs(collection(db, `Users/${email}/ChatHistory`));
  const promises = chatSnap.docs.map(async (sub) => {
    // sub = ChatHistory의 하위 문서(Document)를 의미한다.
    // sub.id = 날짜, 해당 날짜에서 사용한 캐릭터(챗봇)와의 대화내용을 가져온다.
    for (const key in chatUsage) {
      const snap = await getDocs(
        collection(db, `Users/${email}/ChatHistory/${sub.id}/${key}`)
      );
      snap.forEach((prompt) => {
        chatUsage[key] += prompt.data().user.length;
      });
    }
  });

  await Promise.all(promises); // 모든 프로미스가 끝날 때까지 기다린다.(비동기 처리)

  return NextResponse.json({
    data: {
      chatUsage,
    },
  });
}
