import { ChartData } from 'chart.js';

export const getMinMaxTemps = (data: ChartData<'line'>) => {
  const minTemp = data.datasets[0].data.reduce((prev, cur) => (prev! <= cur! ? prev : cur));
  const maxTemp = data.datasets[0].data.reduce((prev, cur) => (prev! >= cur! ? prev : cur));
  const minPos = data.datasets[0].data.indexOf(minTemp);
  const maxPos = data.datasets[0].data.indexOf(maxTemp);
  return {
    min: { time: data.labels![minPos] as string, temp: minTemp as number },
    max: { time: data.labels![maxPos] as string, temp: maxTemp as number },
  };
};
