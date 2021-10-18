import fixtureData from './fixtures/stops.json';
import { CsvRowAsObj } from '~/lib/tasks/builders/utils';
import { combineStopName } from '~/lib/tasks/builders/stops';

describe('builders/stop', () => {
  describe('combine stops name `{parent.name}{child.name}#i?`', () => {
    let data: CsvRowAsObj[];
    beforeEach(() => {
      data = [...fixtureData];
    });

    it('validates fixture data', () => {
      expect(data).toHaveLength(7);
      data.forEach((subject) => {
        expect(subject).toHaveProperty('stop_id');
        expect(subject).toHaveProperty('stop_name');
      });
    });

    it('case: stops in the normal order', async () => {
      const subjects = await combineStopName(data);
      expect(subjects).toHaveLength(5);
      expect(subjects.find((s) => s.stop_id === '0737-01')).toHaveProperty(
        'stop_name',
        '新橋駅前１番のりば',
      );
      expect(subjects.find((s) => s.stop_id === '1253-01')).toHaveProperty(
        'stop_name',
        '晴海三丁目のりば1',
      );
    });

    it('case: stops the order of parent and children is reversed', async () => {
      const subjects = await combineStopName(data.reverse());
      expect(subjects).toHaveLength(5);
      expect(subjects.find((s) => s.stop_id === '0737-01')).toHaveProperty(
        'stop_name',
        '新橋駅前１番のりば',
      );
      expect(subjects.find((s) => s.stop_id === '1253-01')).toHaveProperty(
        'stop_name',
        '晴海三丁目のりば3',
      );
    });
  });
});
