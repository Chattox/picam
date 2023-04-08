import { Image } from '@mantine/core';

export const PiStream = () => {
  return <Image src={process.env.REACT_APP_STREAM_URL} width="40rem" height="22.5rem" />;
};
