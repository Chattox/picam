import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';

export const Clock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const curTime = new Date();
      const hours = curTime.getHours().toString().padStart(2, '0');
      const minutes = curTime.getMinutes().toString().padStart(2, '0');
      const seconds = curTime.getSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Text>Current time: {time}</Text>;
};
