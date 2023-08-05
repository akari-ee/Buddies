import { fetchLogin } from "@/utils/fetchLogin";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: Request,
) {
  const data = await req.json(); // res now contains body
  const code = data.authCode;
  console.log("resis", data);
  const url = `https://kauth.kakao.com/oauth/token/grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&redirect_uri=http://localhost:3000/kakaotalk&code=${code}`;

  // const response = await fetchLogin(url);
  const response = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&redirect_uri=http://localhost:3000/kakaotalk&code=${code}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  }).then((res) => {
    console.log(res);
    res.json()
  });
  return response;
}
