import dayjs from 'dayjs';

export const timeConverter = (dt?: Date) => {
  return dayjs(dt).format('HH:mm').toString();
}