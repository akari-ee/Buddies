// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
const auth = getAuth(app);

async function requestPermission(m) {
  // console.log('권한 요청 중입니다.');
  const permission = await Notification.requestPermission();

  if (permission === 'denied') {
    // console.log('알림 권한이 거절되었습니다.');
    return;
  }
  // console.log('알림 권한이 허용되었습니다.');

  const token = await getToken(m, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });

  if (token) {
    // console.log('token: ', token);
  } else console.log('Can not get Token');

  onMessage(m, (payload) => {
    console.log('메시지가 도착했습니다.', payload);
  });
}

requestPermission(messaging);

export { app, auth, messaging, requestPermission };
