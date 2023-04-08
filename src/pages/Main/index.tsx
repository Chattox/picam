import { Flex, Title } from '@mantine/core';
import { PiStream } from '../../components/PiStream';
import { LogIn } from '../../components/LogIn/Index';
import { useState } from 'react';

export const Main = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Flex direction="column" align="center" justify="center" gap="xl">
      <Title>PiCam</Title>
      {isAuth ? <PiStream /> : <LogIn setIsAuth={setIsAuth} />}
    </Flex>
  );
};
