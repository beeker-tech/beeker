import dayjs from 'dayjs';

export class DateUtils {
  static formatDate = (date: Date | null | undefined, emptyValue = '-') => {
    if (!date) return emptyValue;

    return dayjs(date).format('ddd, MMM D, YYYY h:mm A');
  };
}
