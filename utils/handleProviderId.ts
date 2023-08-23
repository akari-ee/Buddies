export function handleProviderId(email: string) {
  if (email === '' || typeof email === null) {
    return '익명'
  } 
  else if (email.includes('@gmail')) {
    return '구글'
  }
  else if (email.includes('@kakao')) {
    return '카카오톡'
  }
}