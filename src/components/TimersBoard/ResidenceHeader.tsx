import React from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';

// styles
import styles from './ResidenceHeader.module.css';

// types
type ResidenceHeaderComponent = React.FC<{
  name: string;
}>;

const ResidenceHeader: ResidenceHeaderComponent = ({ name }) => (
  <Typography component="h2" variant="h6" className={styles.root}>
    {name}
  </Typography>
);

export default ResidenceHeader;
