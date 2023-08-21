import axios from 'axios';

export const handleUserInfo = (
  userInfo: any,
  providerId: string | null
): UserInfo => {
  return {
    providerId: providerId,
    name: userInfo.displayName,
    email: userInfo.email,
    eamilVerified: userInfo.emailVerified,
    isAnonymous: userInfo.isAnonymous,
    phoneNumber: userInfo.phoneNumber,
    uid: userInfo.uid,
  };
};
export const saveUserInfoInToFirebaseDatabase = async (userInfo: UserInfo) => {
  try {
    const res = await axios.post('/api/firebase/saveUserInfo', {
      data: userInfo,
    });
    const data = res.data;
    console.log('Database Insert Result: ', data);
  } catch (e) {
    console.log('Database Insert Error! ', e);
  }
};
