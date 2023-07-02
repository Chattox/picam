import { Flex, Title } from '@mantine/core';
import { Display } from '../../components/Display';
import { LogIn } from '../../components/LogIn';
import { useEffect, useState } from 'react';
import { isBefore, sub } from 'date-fns';

export interface LoggedInToken {
  time: string;
}

export const Main = () => {
  const [loggedIn, setLoggedIn] = useState<LoggedInToken>({ time: '' });

  useEffect(() => {
    const loggedInItem = localStorage.getItem('loggedIn');
    if (loggedInItem) {
      const loggedInJSON = JSON.parse(loggedInItem);
      if (loggedInJSON.time !== loggedIn.time) {
        setLoggedIn(loggedInJSON);
      }
    }
    if (loggedIn.time) {
      const logInTimestamp = Date.parse(loggedIn.time);
      const now = Date.now();
      const expiryTime = sub(now, { weeks: 1 });
      if (isBefore(logInTimestamp, expiryTime)) {
        localStorage.removeItem('loggedIn');
      }
    }
  }, [loggedIn]);

  return (
    <Flex direction="column" align="center" justify="center" gap="xl">
      <Title>PiCam</Title>
      {loggedIn.time ? <Display /> : <LogIn setLoggedIn={setLoggedIn} />}
    </Flex>
  );
};
