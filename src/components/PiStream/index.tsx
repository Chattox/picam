import { Image } from '@mantine/core';
import { useStyles } from './index.styles';

export const PiStream = () => {
  const { classes } = useStyles();
  return (
    <Image
      src={process.env.REACT_APP_STREAM_URL}
      radius="md"
      className={classes.streamImg}
      withPlaceholder
    />
  );
};
