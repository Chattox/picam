import { ChartData } from 'chart.js';
import { formatTime } from './formatTime';
import { filterDataByTime } from './filterDataByTime';

export interface TempDataProps {
  temp: number;
  time: string;
}

const createLabelsAndDatasets = (data: TempDataProps[]) => {
  const labels = data.map((item) => {
    const time = formatTime(new Date(item.time));
    return time;
  });
  const datasets = [
    {
      label: 'Temperature °C',
      data: data.map((item) => parseFloat(item.temp.toFixed(2))),
    },
    {
      label: 'Min Temp',
      data: [],
    },
    {
      label: 'Max Temp',
      data: [],
    },
  ];

  return { labels, datasets };
};

export const formatTempData = (data: TempDataProps[]): Record<string, ChartData<'line'>> => {
  const filteredData = filterDataByTime(data);

  return {
    all: createLabelsAndDatasets(filteredData.all),
    day: createLabelsAndDatasets(filteredData.day),
    week: createLabelsAndDatasets(filteredData.week),
    month: createLabelsAndDatasets(filteredData.month),
  };
};
