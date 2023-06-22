import { Grid, Collapse } from '@mantine/core';
import { PiStream } from '../PiStream';
import { Temperature } from '../dataCards/Temperature';
import { Clock } from '../dataCards/Clock';
import { useStyles } from './index.styles';
import { TempGraph } from '../dataCards/TempGraph';
import { useDisclosure } from '@mantine/hooks';

export const Display = () => {
  const [opened, { toggle }] = useDisclosure(false);
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
        <Temperature toggleOpened={toggle} />
      </Grid.Col>
      <Grid.Col span={4}>
        <Collapse in={opened} transitionDuration={400}>
          <TempGraph />
        </Collapse>
      </Grid.Col>
    </Grid>
  );
};
