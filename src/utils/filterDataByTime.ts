import { isAfter, parseISO, sub } from 'date-fns';
import { TempDataProps } from './formatTempData';

export const filterDataByTime = (data: TempDataProps[]) => {
  const now = Date.now();
  const dayAgo = sub(now, { days: 1 });
  const weekAgo = sub(now, { weeks: 1 });
  const monthAgo = sub(now, { months: 1 });

  return {
    all: data,
    day: data.filter((i) => isAfter(parseISO(i.time), dayAgo)),
    week: data.filter((i) => isAfter(parseISO(i.time), weekAgo)),
    month: data.filter((i) => isAfter(parseISO(i.time), monthAgo)),
  };
};
