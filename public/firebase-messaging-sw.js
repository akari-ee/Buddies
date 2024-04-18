// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js'
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyDqmWvlgu_cByYAW70UISCuQcZzpwkMQZA',
  authDomain: 'logintest-7c52f.firebaseapp.com',
  projectId: 'logintest-7c52f',
  databaseURL:
    'https://logintest-7c52f-default-rtdb.asia-southeast1.firebasedatabase.app',
  storageBucket: 'logintest-7c52f.appspot.com',
  messagingSenderId: '712124155269',
  appId: '1:712124155269:web:4bafab35386817cdc870ec',
  measurementId: 'G-9G8N4JH9EN',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

self.addEventListener('push', function (event) {
  if (event.data) {
    // 알림 메세지일 경우엔 event.data.json().notification;
    const data = event.data.json().data;
    const options = {
      body: data.body,
      icon: data.image,
      image: data.image,
      data: {
        click_action: data.click_action, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.log('This push event has no data.');
  }
});

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
