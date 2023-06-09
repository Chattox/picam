import { Card, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

export const Clock = () => {
  const [time, setTime] = useState('');

  const getTime = () => {
    const curTime = new Date();
    const hours = curTime.getHours().toString().padStart(2, '0');
    const minutes = curTime.getMinutes().toString().padStart(2, '0');
    const seconds = curTime.getSeconds().toString().padStart(2, '0');
    setTime(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    getTime();
    const interval = setInterval(() => getTime(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={700}>Current time:</Text> <Text>{time}</Text>
    </Card>
  );
};
