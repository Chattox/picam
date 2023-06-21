import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { formatTempData } from '../../../utils/formatTempData';
import { getTempHistory } from '../../../utils/getTempHistory';
import { ChartData, ChartOptions } from 'chart.js/auto';

const config: ChartOptions<'line'> = {
  elements: {
    line: {
      tension: 1,
      borderWidth: 5,
    },
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      labels: {
        boxHeight: 3,
        boxWidth: 3,
      },
    },
  },
};

export const TempGraph = () => {
  const [lineData, setLineData] = useState<ChartData<'line'>>({ labels: [], datasets: [] });
  const [lineOptions, setLineOptions] = useState<ChartOptions<'line'>>(config);

  useEffect(() => {
    getTempHistory().then((res) => setLineData(formatTempData(res.data)));
  }, []);

  return <Line data={lineData} options={lineOptions} />;
};
