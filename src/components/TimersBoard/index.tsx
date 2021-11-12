import React from 'react';

// material-ui
import Container from '@material-ui/core/Container';

// components
import ResidenceHeader from './ResidenceHeader';
import NearStop from './NearStop';

// styles
import styles from './TimersBoard.module.css';

// types
import { Residence } from '~/data/types';

type TimersBoardComponent = React.FC<{
  data: Residence;
}>;

const TimersBoard: TimersBoardComponent = ({ data }) => {
  return (
    <main>
      <ResidenceHeader name={data.name} />
      <Container className={styles.container}>
        {data.stops.map(stop => (
          <NearStop key={stop.stop.id} target={stop} />
        ))}
      </Container>
    </main>
  );
};

export default TimersBoard;
