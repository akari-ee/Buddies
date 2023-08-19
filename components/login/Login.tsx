'use client';

import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '@/config/firebase';
import { RiKakaoTalkFill } from '@react-icons/all-files/ri/RiKakaoTalkFill';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';

import LoginDialog from './Dialog';
import { usePathname, useRouter } from 'next/navigation';

type Props = {};


declare global {
  interface Window {
    Kakao: any;
  }
}

const redirectUri = `http://localhost:3000/oauth/callback/kakao`;
const scope = [
  'profile_nickname',
  'profile_image',
  'account_email',
  'gender',
  'age_range',
  'birthday',
  'friends',
  'openid',
].join(',');

export default function Login({}: Props) {
  useEffect(() => {
    console.log('window.Kakao: ', window.Kakao);
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        console.log('after Init: ', window.Kakao.isInitialized());
      }
    }
  }, []);

  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        console.log('after Init: ', window.Kakao.isInitialized());
      }
    }
  }, [window.Kakao]);
  
  const router = useRouter();
  // 카카로 로그인 Handler
  const [isOpen, setIsOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<string>('');

  const openDialog = () => {
    setIsOpen((prev) => !prev);
  };
  const closeDialog = () => {
    setIsOpen((prev) => !prev);
  };

  const firebaseLogin = (email: string) => {
    const provider = new OAuthProvider('oidc.kakao');
    // signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        const idToken = credential?.idToken;
        // console.log('Firebase AccessToken', accessToken);
        // console.log('Firebase IdToken', idToken);
        // getKakaoUserInfo(accessToken ? accessToken : '');
      })
      .catch((error) => {
        console.log(error);
      });
    router.push('/home');
  };

  // useEffect(() => {
  //   async function myFunction() {
  //     const csrfToken = await getCsrfToken();
  //     console.log(csrfToken);
  //     getKakaoUserInfo(csrfToken ? csrfToken : '');
  //     setAccessToken(csrfToken ? csrfToken : '');
  //   }

  //   if (session?.user) {
  //     const userInfo = session.user;
  //     console.log('Session ', userInfo);
  //     myFunction();
  //     firebaseLogin(userInfo.email ? userInfo.email : '');
  //   }
  // }, [session]);

  const kakaoLoginHandler = () => {
    // signIn('kakao');
    // if(!Kakao?.isInitialized()) {
    //   console.log(Kakao.isInitialized())
    //   Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_REST_KEY);
    // }
    window.Kakao.Auth.authorize({
      redirectUri,
      scope,
    });
    console.log('Kakao Logining');
  };

  // 구글 로그인 Handler
  const googleLoginHandler = async () => {
    console.log('Google Logining');
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((data) => {
        console.log(data);
        router.push('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  return (
    <div className='w-full flex flex-col justify-center items-center space-y-6 mb-20'>
      <div className='w-full flex justify-center items-center space-x-3 md:space-x-5'>
        <button
          onClick={kakaoLoginHandler}
          className='rounded-full overflow-hidden h-10 w-10 bg-[#F9E000] flex items-center justify-center text-2xl shadow-md md:w-16 md:h-16 md:text-4xl'
        >
          <RiKakaoTalkFill />
          {/* <Image src={kakaoTalkLogo} alt='kakaoLogin' width={30} height={30}/> */}
        </button>

        <button
          onClick={googleLoginHandler}
          className='rounded-full overflow-hidden h-10 w-10 flex items-center justify-center text-2xl shadow-md md:w-16 md:h-16 md:text-4xl'
        >
          <FcGoogle />
        </button>
      </div>
      <div className='text-xs text-[#868686] md:text-lg'>
        <button className='underline' onClick={openDialog}>
          비회원으로 서비스 이용하기
        </button>
        <LoginDialog isOpen={isOpen} onClose={closeDialog} />
      </div>
    </div>
  );
}
