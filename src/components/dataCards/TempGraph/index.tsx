import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import { useEffect, useState } from 'react';
import { ActionIcon, Card, Group, SegmentedControl, useMantineTheme } from '@mantine/core';
import { TempDataProps, formatTempData } from '../../../utils/formatTempData';
import { getTempHistory } from '../../../utils/getTempHistory';
import { IconRefresh } from '@tabler/icons-react';

export interface MinMaxTempProps {
  min: TempDataProps;
  max: TempDataProps;
}

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
        hitRadius: 20,
        hoverRadius: 8,
      },
    },
    plugins: {
      legend: {
        labels: { boxWidth: 5, boxHeight: 5, padding: 20 },
      },
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

  interface LineDataProps {
    [key: 'all' | 'day' | 'week' | 'month' | string]: {
      data: ChartData<'line'>;
      minMax: MinMaxTempProps;
    };
  }

  const placeholderData = {
    all: {
      data: { labels: [], datasets: [] },
      minMax: { min: { temp: 0, time: '' }, max: { temp: 999, time: '' } },
    },
    day: {
      data: { labels: [], datasets: [] },
      minMax: { min: { temp: 0, time: '' }, max: { temp: 999, time: '' } },
    },
    week: {
      data: { labels: [], datasets: [] },
      minMax: { min: { temp: 0, time: '' }, max: { temp: 999, time: '' } },
    },
    month: {
      data: { labels: [], datasets: [] },
      minMax: { min: { temp: 0, time: '' }, max: { temp: 999, time: '' } },
    },
  };

  const [lineData, setLineData] = useState<LineDataProps>(placeholderData);
  const [lineOptions, setLineOptions] = useState<ChartOptions<'line'>>(config);
  const [graphTimeframe, setGraphTimeframe] = useState('day');
  const [isLoading, setIsloading] = useState(true);

  const refreshChart = () => {
    getTempHistory().then((res) => {
      setLineData(formatTempData(res.data));
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
                xValue: lineData[graphTimeframe].minMax.min.time,
                yValue: parseFloat(lineData[graphTimeframe].minMax.min.temp.toFixed(2)),
                backgroundColor: theme.fn.rgba(theme.colors.cyan[3], 1),
                radius: 4,
                borderWidth: 0,
              },
              maxTemp: {
                type: 'point',
                xValue: lineData[graphTimeframe].minMax.max.time,
                yValue: parseFloat(lineData[graphTimeframe].minMax.max.temp.toFixed(2)),
                backgroundColor: theme.fn.rgba(theme.colors.orange[5], 1),
                radius: 4,
                borderWidth: 0,
              },
            },
          },
        },
      });
      setIsloading(false);
    });
  };

  useEffect(() => {
    refreshChart();
    //eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
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
              xValue: lineData[graphTimeframe].minMax.min.time,
              yValue: parseFloat(lineData[graphTimeframe].minMax.min.temp.toFixed(2)),
              backgroundColor: theme.fn.rgba(theme.colors.cyan[3], 1),
              radius: 4,
              borderWidth: 0,
            },
            maxTemp: {
              type: 'point',
              xValue: lineData[graphTimeframe].minMax.max.time,
              yValue: parseFloat(lineData[graphTimeframe].minMax.max.temp.toFixed(2)),
              backgroundColor: theme.fn.rgba(theme.colors.orange[5], 1),
              radius: 4,
              borderWidth: 0,
            },
          },
        },
      },
    });
    // eslint-disable-next-line
  }, [graphTimeframe]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="apart">
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
        <ActionIcon color="cyan" size="lg" variant="outline" onClick={() => setIsloading(true)}>
          <IconRefresh />
        </ActionIcon>
      </Group>
      {isLoading ? null : <Line data={lineData[graphTimeframe].data} options={lineOptions} />}
    </Card>
  );
};
