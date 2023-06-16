import { Flex } from '@mantine/core';
import { PiStream } from '../PiStream';
import { Temperature } from '../Temperature';

export const Display = () => {
  return (
    <Flex direction="column" align="center" justify="center" gap="xl">
      <PiStream />
      <Temperature />
    </Flex>
  );
};
