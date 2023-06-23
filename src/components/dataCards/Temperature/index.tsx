import { Text, Card, ActionIcon } from '@mantine/core';
import { IconTimeline } from '@tabler/icons-react';
import { getTemp } from '../../../utils/getTemp';
import { useEffect, useState } from 'react';
import { formatTime } from '../../../utils/formatTime';
import { useStyles } from './index.styles';

export interface Temp {
  temp: number;
  time: string;
}

export const Temperature = (props: { toggleOpened: () => void }) => {
  const [temp, setTemp] = useState(999);
  const [minTemp, setMinTemp] = useState<Temp>({ temp: 999, time: '' });
  const [maxTemp, setMaxTemp] = useState<Temp>({ temp: 999, time: '' });
  const [timestamp, setTimestamp] = useState('');
  const { classes } = useStyles();

  const getTemperature = () => {
    getTemp().then((res) => {
      if (res.status === 200) {
        setTemp(res.data.temp.toFixed(2));
        const minTime = new Date(res.data.minTemp.time);
        const maxTime = new Date(res.data.maxTemp.time);
        setMinTemp({ temp: res.data.minTemp.temp.toFixed(2), time: formatTime(minTime) });
        setMaxTemp({ temp: res.data.maxTemp.temp.toFixed(2), time: formatTime(maxTime) });
        const time = new Date(res.data.time);
        setTimestamp(formatTime(time));
      } else {
        setTemp(999);
        console.log(res.status);
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    getTemperature();
    const interval = setInterval(() => {
      getTemperature();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={700}>Current temperature:</Text> <Text> {temp} °C</Text>
      <Text fw={700}>Last polled: </Text>
      <Text> {timestamp}</Text>
      <ActionIcon
        color="cyan"
        size="lg"
        variant="outline"
        onClick={() => props.toggleOpened()}
        className={classes.graphButton}
      >
        <IconTimeline />
      </ActionIcon>
    </Card>
  );
};
