import { resolve } from 'path';
import { mapTripToRouteAndService, combineTripIds } from '~/lib/tasks/builders/trips';
import { parseCsvSync, CsvRowAsObj } from '~/lib/tasks/builders/utils';

describe('builders/trips', () => {
  describe('#mapTripToRouteAndService', () => {
    it('should mapping data, `trip_id -> { route_id, service_id }`', () => {
      const subjects = mapTripToRouteAndService(resolve(__dirname, 'fixtures'));
      Object.values(subjects).forEach((subject) => {
        expect(subject).toHaveProperty('route_id');
        expect(subject).toHaveProperty('service_id');
      });
    });
  });

  describe('#combineTripIds', () => {
    let fixture: CsvRowAsObj[];
    beforeEach(() => {
      fixture = parseCsvSync(resolve(__dirname, 'fixtures'), 'trips.txt');
    });

    it('`id` from `route_id-service_id`', () => {
      const subjects = combineTripIds(fixture);
      subjects.forEach((subject) => {
        expect(subject.id).toBe(`${subject.route_id}-${subject.service_id}`);
      });
    });

    it('`tripIds` string[] from `trip_id`', () => {
      const subjects = combineTripIds(fixture);
      expect(subjects).toHaveLength(3);
      subjects.forEach((subject) => {
        // all tripIds are formated of `trip_id`
        const expected = expect.stringMatching(`^${subject.id}`);
        subject.tripIds.forEach((s) => expect(s).toEqual(expected));
        // tripIds are sorted
        const sortExpected = [...subject.tripIds].sort();
        expect(subject.tripIds).toEqual(sortExpected);
      });
    });
  });
});
