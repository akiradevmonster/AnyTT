import React from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// data
import { Residence } from '~/data/types';
import data from '~/data/fixtures/dt.json';

// styles
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const d: Residence = data;
  return (
    <Typography variant="h5" component="h1" color="primary" align="center">
      Next.js with TypeScript
      <Button
        variant="contained"
        color="secondary"
        classes={{ root: styles.root }}
        className={styles.big}
        fullWidth
      >
        Subscribe
      </Button>
      <Typography>Normal text.</Typography>
      <pre>{JSON.stringify(d, null, 2)}</pre>
    </Typography>
  );
};

export default Hero;
