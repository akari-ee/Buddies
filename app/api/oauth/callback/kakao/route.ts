import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  // console.log("body is ", req.body);
  const url = new URL(req.url); // url 객체 생성
  const code = url.searchParams.get('code'); // code 데이터 추출
  try {
    const res = await axios(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}&code=${code}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const data = res.data;
    return NextResponse.json({
      data: data,
    });
  } catch (e) {
    return NextResponse.json({
      data: 'fail',
    });
  }
}
