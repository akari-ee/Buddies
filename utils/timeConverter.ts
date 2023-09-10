import dayjs from 'dayjs';

dayjs.locale('ko');
export const timeConverter = (dt?: Date) => {
  return dayjs(dt).format('HH:mm').toString();
}