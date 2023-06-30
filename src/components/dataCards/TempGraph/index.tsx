import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import { useEffect, useState } from 'react';
import { Card, SegmentedControl, useMantineTheme } from '@mantine/core';
import { formatTempData } from '../../../utils/formatTempData';
import { getTempHistory } from '../../../utils/getTempHistory';
import { getMinOrMaxTemp } from '../../../utils/getMinOrMaxTemp';

export const TempGraph = () => {
  const theme = useMantineTheme();
  Chart.register(annotationPlugin);

  const config: ChartOptions<'line'> = {
    scales: {
      x: {
        ticks: {
          display: false,
          maxTicksLimit: 4,
        },
      },
      y: {
        grace: '5%',
      },
    },
    elements: {
      line: {
        tension: 0.5,
        borderWidth: 5,
        borderColor: [
          theme.fn.rgba(theme.colors.blue[7], 1),
          theme.fn.rgba(theme.colors.cyan[3], 1),
          theme.fn.rgba(theme.colors.orange[5], 1),
        ],
        backgroundColor: theme.fn.rgba(theme.colors.blue[7], 1),
      },
      point: {
        radius: 1,
        borderColor: theme.fn.rgba(theme.colors.blue[7], 1),
        backgroundColor: theme.fn.rgba(theme.colors.blue[7], 1),
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

  const [lineData, setLineData] = useState<ChartData<'line'>>({ labels: [], datasets: [] });
  const [lineOptions, setLineOptions] = useState<ChartOptions<'line'>>(config);
  const [graphTimeframe, setGraphTimeframe] = useState('day');

  useEffect(() => {
    getTempHistory().then((res) => {
      const data = formatTempData(res.data);
      setLineData(data[graphTimeframe]);
      const minTemp = getMinOrMaxTemp('min', data[graphTimeframe]);
      const maxTemp = getMinOrMaxTemp('max', data[graphTimeframe]);
      setLineOptions({
        ...lineOptions,
        plugins: {
          legend: {
            labels: { boxWidth: 5, boxHeight: 5, padding: 20 },
          },
          annotation: {
            annotations: {
              minTemp: {
                type: 'point',
                xValue: minTemp.time,
                yValue: parseFloat(minTemp.temp.toFixed(2)),
                backgroundColor: theme.fn.rgba(theme.colors.cyan[3], 1),
                radius: 4,
                borderWidth: 0,
              },
              maxTemp: {
                type: 'point',
                xValue: maxTemp.time,
                yValue: parseFloat(maxTemp.temp.toFixed(2)),
                backgroundColor: theme.fn.rgba(theme.colors.orange[5], 1),
                radius: 4,
                borderWidth: 0,
              },
            },
          },
        },
      });
    });
    //eslint-disable-next-line
  }, [graphTimeframe, lineData]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <SegmentedControl
        value={graphTimeframe}
        onChange={setGraphTimeframe}
        data={[
          { label: 'Day', value: 'day' },
          { label: 'Week', value: 'week' },
          { label: 'Month', value: 'month' },
          { label: 'All', value: 'all' },
        ]}
      />
      <Line data={lineData} options={lineOptions} />
    </Card>
  );
};
