import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { formatTempData } from '../../../utils/formatTempData';
import { getTempHistory } from '../../../utils/getTempHistory';
import { ChartData } from 'chart.js/auto';

interface LineProps {
  data: ChartData<'line'>;
}

export const TempGraph = () => {
  const [lineProps, setLineProps] = useState<LineProps>({ data: { labels: [], datasets: [] } });

  useEffect(() => {
    getTempHistory().then((res) => setLineProps({ data: formatTempData(res.data) }));
  }, []);
  return <Line data={lineProps.data} />;
};
