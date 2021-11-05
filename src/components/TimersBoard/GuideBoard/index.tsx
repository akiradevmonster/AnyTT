import React from 'react';

// material-ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

// material-ui icons
import BackArrowIcon from '@material-ui/icons/ArrowBackIosRounded';
import ForwardArrowIcon from '@material-ui/icons/ArrowForwardIosRounded';

// styles
import styles from './GuideBoard.module.css';

// types
import { Timetable, NextTime, Contact } from '~/data/types';

type GuideBoardComponent = React.FC<{
  contact: Contact;
  delayMinutes: number;
}>;

type nextTimeF = (timetable: Timetable, now: Date, delay?: number) => NextTime | null;

// prototyping
const nextTime: nextTimeF = (tt, now, delay = 0) => {
  if (tt.data === null) {
    return null;
  }
  const nowTime = (now.getHours() - 4) * 60 * 60 + (now.getMinutes() + delay) * 60;
  const nextTimeIndex = tt.data.findIndex(t => t > nowTime);
  if (nextTimeIndex < 0) {
    return null;
  }
  return tt.data[nextTimeIndex];
};

// TODO: pass delay `seconds` instead of minutes (no rounded)
const GuideBoard: GuideBoardComponent = ({ contact, delayMinutes }) => {
  const { timetable } = contact;
  const now = new Date('2020-01-29 07:11:19');
  const day = now.getDay(); // Wednesday
  if (!timetable.calendar.includes(day)) {
    return null;
  }

  const n = nextTime(timetable, now, delayMinutes);

  if (n === null) {
    return null;
  }

  const hour = Math.floor(n / (60 * 60)) + 4;
  const minute = (n % (60 * 60)) / 60;

  return (
    <Grid container direction="column">
      <Grid item container justify="space-between" alignItems="center">
        <Grid item>
          <Typography>{contact.route.destination}行</Typography>
        </Grid>
        {contact.route.headsign && (
          <Grid item>
            <Chip size="small" label={contact.route.headsign} />
          </Grid>
        )}
      </Grid>
      <Grid item container justify="space-between" alignItems="flex-end">
        <Grid item>
          <Button
            color="secondary"
            startIcon={<BackArrowIcon />}
            classes={{
              root: styles['adjust-width'],
              label: styles.back,
              startIcon: styles.nomargin,
            }}
          >
            <Typography component="span" variant="caption">
              前発
            </Typography>
          </Button>
        </Grid>
        <Grid
          item
          container
          justify="space-around"
          alignItems="baseline"
          className={styles.time}
        >
          <Grid item>
            <Typography component="span" variant="h6">
              {hour}:{minute}
            </Typography>
            <Typography component="span" variant="body2">
              発
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="span" variant="h4">
              {minute - now.getMinutes()}
            </Typography>
            <Typography component="span" variant="body2">
              分
            </Typography>
            <Typography component="span" variant="h4">
              {60 - now.getSeconds()}
            </Typography>
            <Typography component="span" variant="body2">
              秒
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            endIcon={<ForwardArrowIcon />}
            classes={{
              root: styles['adjust-width'],
              label: styles.forward,
              endIcon: styles.nomargin,
            }}
          >
            <Typography component="span" variant="caption">
              次発
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GuideBoard;
