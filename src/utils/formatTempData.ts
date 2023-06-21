import { ChartData } from 'chart.js';

interface TempDataProps {
  temp: number;
  time: string;
}

export const formatTempData = (data: TempDataProps[]): ChartData<'line'> => {
  const labels = data.map((item) => item.time);
  const datasets = [{ label: 'Temperature', data: data.map((item) => item.temp) }];

  return { labels, datasets };
};
