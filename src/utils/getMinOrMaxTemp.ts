import { ChartData } from 'chart.js';
import { Temp } from '../components/dataCards/Temperature';

export const getMinOrMaxTemp = (minOrMax: 'min' | 'max', data: ChartData<'line'>): Temp => {
  const temperature = data.datasets[0].data.reduce((prev, cur) => {
    if (minOrMax === 'min') {
      return prev! <= cur! ? prev : cur;
    } else {
      return prev! >= cur! ? prev : cur;
    }
  });
  const dataPos = data.datasets[0].data.indexOf(temperature);
  return {
    time: data.labels![dataPos] as string,
    temp: temperature as number,
  };
};
