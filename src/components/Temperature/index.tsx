import { Text, Card } from '@mantine/core';
import { getTemp } from '../../utils/getTemp';
import { useEffect, useState } from 'react';
import { formatTime } from '../../utils/formatTime';

export interface Temp {
  temp: number;
  time: string;
}

export const Temperature = () => {
  const [temp, setTemp] = useState(999);
  const [minTemp, setMinTemp] = useState<Temp>({ temp: 999, time: '' });
  const [maxTemp, setMaxTemp] = useState<Temp>({ temp: 999, time: '' });
  const [timestamp, setTimestamp] = useState('');

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
      <Text fw={700}>Min temp:</Text>
      <Text span> {minTemp.temp} °C</Text>
      <Text fz="sm" fs="italic" span>
        {' '}
        at
      </Text>{' '}
      <Text span> {minTemp.time}</Text>
      <Text fw={700}>Max temp: </Text>
      <Text span> {maxTemp.temp} °C</Text>{' '}
      <Text fz="sm" fs="italic" span>
        {' '}
        at
      </Text>
      <Text span> {maxTemp.time}</Text>
      <Text fw={700}>Last polled: </Text>
      <Text> {timestamp}</Text>
    </Card>
  );
};
