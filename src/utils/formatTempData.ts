import { ChartData } from 'chart.js';
import { formatTime } from './formatTime';

interface TempDataProps {
  temp: number;
  time: string;
}

export const formatTempData = (data: TempDataProps[]): ChartData<'line'> => {
  const labels = data.map((item) => {
    const time = formatTime(new Date(item.time));
    return time;
  });
  const datasets = [
    {
      label: 'Temperature °C',
      data: data.map((item) => parseFloat(item.temp.toFixed(2))),
    },
  ];

  return { labels, datasets };
};
