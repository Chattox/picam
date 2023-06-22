import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { formatTempData } from '../../../utils/formatTempData';
import { getTempHistory } from '../../../utils/getTempHistory';
import { ChartData, ChartOptions } from 'chart.js/auto';

const config: ChartOptions<'line'> = {
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 6,
        align: 'start',
        minRotation: 45,
      },
    },
  },
  elements: {
    line: {
      tension: 0.5,
      borderWidth: 5,
    },
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
};

export const TempGraph = () => {
  const [lineData, setLineData] = useState<ChartData<'line'>>({ labels: [], datasets: [] });
  const [lineOptions] = useState<ChartOptions<'line'>>(config);

  useEffect(() => {
    getTempHistory().then((res) => setLineData(formatTempData(res.data)));
  }, []);

  return <Line data={lineData} options={lineOptions} />;
};
