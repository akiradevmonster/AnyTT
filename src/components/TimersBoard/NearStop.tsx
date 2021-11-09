import React, { Fragment } from 'react';

// material-ui
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

// material-ui icons
import WalkIcon from '@material-ui/icons/DirectionsWalkRounded';

// styles
import styles from './NearStop.module.css';

// components
import GuideBoard from './GuideBoard';

// types
import { StopWithPath } from '~/data/types';

type NearStopComponent = React.FC<{
  target: StopWithPath;
}>;

const calcTraversalTime = (d: number): number => Math.round(d / 60);

const NearStop: NearStopComponent = ({ target }) => {
  const { distance, stop } = target;
  const traversalMinutes = calcTraversalTime(distance);

  return (
    <Grid container direction="column" className={styles.container}>
      <Grid item className={styles.item}>
        <Chip size="small" icon={<WalkIcon />} label={`${traversalMinutes}分`} />
      </Grid>
      <Grid item className={styles.stop}>
        <Card>
          <Grid container className={styles['header-container']}>
            <Grid item className={styles['header-title']}>
              <CardHeader
                className={styles.title}
                title={stop.name}
                subheader={stop.agency.name}
                titleTypographyProps={{ variant: 'body2' }}
                subheaderTypographyProps={{ variant: 'caption' }}
              />
            </Grid>
            <Grid item className={styles['header-map']}>
              <CardMedia component="img" image="/bus-map.png" className={styles.map}/>
            </Grid>
          </Grid>
          <CardContent>
            {stop.contacts.map((contact, i) => (
              <Fragment key={contact.id}>
                {i > 0 && <Divider className={styles.divider} />}
                <GuideBoard contact={contact} delayMinutes={traversalMinutes} />
              </Fragment>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NearStop;
