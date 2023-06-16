import { Flex, Title } from '@mantine/core';
import { Display } from '../../components/Display';
import { LogIn } from '../../components/LogIn';
import { useState } from 'react';

export const Main = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Flex direction="column" align="center" justify="center" gap="xl">
      <Title>PiCam</Title>
      {isAuth ? <Display /> : <LogIn setIsAuth={setIsAuth} />}
    </Flex>
  );
};
