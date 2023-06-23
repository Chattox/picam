import { Temp } from '../components/dataCards/Temperature';

export const getMinOrMaxTemp = (minOrMax: 'min' | 'max', temps: Temp[]) => {
  if (minOrMax === 'min') {
    return temps.reduce((prev, cur) => {
      return prev.temp <= cur.temp ? prev : cur;
    });
  } else {
    return temps.reduce((prev, cur) => {
      return prev.temp >= cur.temp ? prev : cur;
    });
  }
};
