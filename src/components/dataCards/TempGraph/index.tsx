import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js/auto';
import { Card } from '@mantine/core';
import { formatTempData } from '../../../utils/formatTempData';
import { getTempHistory } from '../../../utils/getTempHistory';

const config: ChartOptions<'line'> = {
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 6,
        align: 'start',
        minRotation: 10,
        maxRotation: 45,
      },
    },
  },
  elements: {
    line: {
      tension: 0.5,
      borderWidth: 5,
    },
    point: {
      radius: 1,
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

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Line data={lineData} options={lineOptions} />
    </Card>
  );
};
