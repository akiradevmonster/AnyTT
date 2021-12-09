import moment from 'moment';

/* eslint-disable no-underscore-dangle */
export class BusTime {
  private _time: string;

  private _t: moment.Duration;

  private _baseTime = moment.duration(4, 'hours'); // time at 4 am.

  constructor(time: string) {
    this._time = time;
    const dur = moment.duration(time);
    this._t = this.isMidnight(dur) ? dur.add(1, 'day') : dur;
  }

  toSecondsSinceBaseTime(): number {
    return this._t.subtract(this._baseTime).asSeconds();
  }

  private isMidnight(d: moment.Duration): boolean {
    return d.asHours() < this._baseTime.asHours();
  }
}
/* eslint-enable no-underscore-dangle */

export const toSecFor4am: (time: string) => number = (time) => {
  const t = new BusTime(time);
  return t.toSecondsSinceBaseTime();
};
