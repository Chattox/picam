import { Flex } from '@mantine/core';
import { PiStream } from '../PiStream';
import { Temperature } from '../Temperature';
import { Clock } from '../Clock';

export const Display = () => {
  return (
    <Flex direction="column" align="center" justify="center" gap="xl">
      <PiStream />
      <Clock />
      <Temperature />
    </Flex>
  );
};
