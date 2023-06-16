import { Text } from '@mantine/core';
import { getTemp } from '../../utils/getTemp';
import { useEffect, useState } from 'react';

export const Temperature = () => {
  const [temp, setTemp] = useState(0);

  const getTemperature = () => {
    getTemp().then((res) => {
      if (res.status === 200) {
        setTemp(res.data.temp.toFixed(2));
      } else {
        setTemp(999);
        console.log(res.status);
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => getTemperature(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Text>Current temperature: {temp} °C</Text>;
};
