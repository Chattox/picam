import { Grid } from '@mantine/core';
import { PiStream } from '../PiStream';
import { Temperature } from '../dataCards/Temperature';
import { Clock } from '../dataCards/Clock';
import { useStyles } from './index.styles';

export const Display = () => {
  const { classes } = useStyles();
  return (
    <Grid className={classes.display} columns={4} align="flex-start" gutter="xl" justify="center">
      <Grid.Col span={4}>
        <PiStream />
      </Grid.Col>
      <Grid.Col span={2}>
        <Clock />
      </Grid.Col>
      <Grid.Col span={2}>
        <Temperature />
      </Grid.Col>
    </Grid>
  );
};
