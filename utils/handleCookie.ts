const handleCookies = {
  setCookie(key: string, value: string, expiredays: number): void {
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);

    document.cookie =
      key +
      '=' +
      encodeURI(value) +
      '; path=/; expires=' +
      todayDate.toUTCString() +
      ';';
  },
  delCookie(key: string): void {
    document.cookie = key + '=; path=/; expires=-100000';
  },
};
export default handleCookies;
export const { setCookie, delCookie } = handleCookies;
