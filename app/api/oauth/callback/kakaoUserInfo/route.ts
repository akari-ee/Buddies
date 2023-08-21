import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// 카카오 유저 프로필 정보 Callback
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  try {
    const res = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

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
