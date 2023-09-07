import * as admin from 'firebase-admin';

const firebaseAdminConfig = {
  privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}