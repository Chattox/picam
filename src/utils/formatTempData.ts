import { formatTime } from './formatTime';
import { filterDataByTime } from './filterDataByTime';
import { getMinMaxTemps } from './getMinMaxTemps';
import { ChartData } from 'chart.js';
import { MinMaxTempProps } from '../components/dataCards/TempGraph';

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

const getMinMaxTempsData = (
  data: Record<string, ChartData<'line'>>
): Record<string, MinMaxTempProps> => {
  return {
    all: getMinMaxTemps(data.all),
    day: getMinMaxTemps(data.day),
    week: getMinMaxTemps(data.week),
    month: getMinMaxTemps(data.month),
  };
};

export const formatTempData = (data: TempDataProps[]) => {
  const filteredData = filterDataByTime(data);
  const formattedData = {
    all: createLabelsAndDatasets(filteredData.all),
    day: createLabelsAndDatasets(filteredData.day),
    week: createLabelsAndDatasets(filteredData.week),
    month: createLabelsAndDatasets(filteredData.month),
  };
  const minMaxTempData = getMinMaxTempsData(formattedData);

  return {
    all: { data: formattedData.all, minMax: minMaxTempData.all },
    day: { data: formattedData.day, minMax: minMaxTempData.day },
    week: { data: formattedData.week, minMax: minMaxTempData.week },
    month: { data: formattedData.month, minMax: minMaxTempData.month },
  };
};
