import moment from 'moment';

export const dateToAgo = (date: string) => {
  return moment.utc(date).local().startOf('seconds').fromNow();
};
