export function handleProviderId(provider: string) {
  if (provider === 'google') return '구글';
  else if (provider === 'kakao') return '카카오';
  else return '익명';
}
