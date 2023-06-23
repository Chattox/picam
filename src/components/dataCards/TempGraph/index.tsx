import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import { useEffect, useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js/auto';
import { Card } from '@mantine/core';
import { formatTempData } from '../../../utils/formatTempData';
import { getTempHistory } from '../../../utils/getTempHistory';
import { getMinOrMaxTemp } from '../../../utils/getMinOrMaxTemp';
import { formatTime } from '../../../utils/formatTime';

Chart.register(annotationPlugin);

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
      borderColor: 'rgba(25, 100, 126, 1)',
    },
    point: {
      radius: 1,
      borderColor: 'rgba(25, 100, 126, 1)',
    },
  },
  plugins: {
    annotation: {
      annotations: {
        minTemp: {
          type: 'point',
          xValue: undefined,
          yValue: undefined,
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
          radius: 3,
          borderWidth: 0,
          display: false,
        },
        maxTemp: {
          type: 'point',
          xValue: undefined,
          yValue: undefined,
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          radius: 3,
          borderWidth: 0,
          display: false,
        },
      },
    },
  },
};

export const TempGraph = () => {
  const [lineData, setLineData] = useState<ChartData<'line'>>({ labels: [], datasets: [] });
  const [lineOptions, setLineOptions] = useState<ChartOptions<'line'>>(config);

  useEffect(() => {
    getTempHistory().then((res) => {
      const data = formatTempData(res.data);
      setLineData(data);
      const minTemp = getMinOrMaxTemp('min', res.data);
      const maxTemp = getMinOrMaxTemp('max', res.data);
      setLineOptions({
        ...lineOptions,
        plugins: {
          annotation: {
            annotations: {
              minTemp: {
                type: 'point',
                xValue: formatTime(new Date(minTemp.time)),
                yValue: parseFloat(minTemp.temp.toFixed(2)),
                backgroundColor: 'rgba(75, 63, 114, 1)',
                radius: 5,
                borderWidth: 0,
              },
              maxTemp: {
                type: 'point',
                xValue: formatTime(new Date(maxTemp.time)),
                yValue: parseFloat(maxTemp.temp.toFixed(2)),
                backgroundColor: 'rgba(255, 200, 87, 1)',
                radius: 5,
                borderWidth: 0,
              },
            },
          },
        },
      });
    });
  }, []);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Line data={lineData} options={lineOptions} />
    </Card>
  );
};
