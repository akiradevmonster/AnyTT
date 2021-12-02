// types
import { BulkOperation } from '~/lib/types/mongodb.bulkOps';
import { GtfsSourceIdentifier } from '../tasks.config';

// builders
import { setup, teardown, extractFeedVersion } from './feedInfo';
import buildAgency, { extractAgencyId } from './agency';
import buildStop from './stops';
import buildRouteByTrips from './trips';
import buildRouteByRoutes from './routes';
import buildRouteByRoutesJp from './routesJp';
import buildTimetableByStopTimes from './stopTimes';
import buildTimetableByCalendar from './calendar';
import buildCleaningOldData from './clean';

export type BulkOpsWithModel = {
  model: string;
  ops: BulkOperation[];
};

const buildBulkOperations = (
  source: GtfsSourceIdentifier,
  dirPath: string,
): BulkOpsWithModel[] => {
  const agencyId = extractAgencyId(dirPath);
  const feedVersion = extractFeedVersion(dirPath);
  return [
    { model: 'Feed', ops: setup(source, dirPath) },
    { model: 'Agency', ops: buildAgency(source, dirPath) },
    { model: 'Stop', ops: buildStop(dirPath, agencyId, feedVersion) },
    { model: 'Route', ops: buildRouteByTrips(dirPath, agencyId, feedVersion) },
    { model: 'Route', ops: buildRouteByRoutes(dirPath, agencyId) },
    { model: 'Route', ops: buildRouteByRoutesJp(dirPath, agencyId) },
    {
      model: 'Timetable',
      ops: buildTimetableByStopTimes(dirPath, agencyId, feedVersion),
    },
    { model: 'Timetable', ops: buildTimetableByCalendar(dirPath, agencyId) },
    ...['Stop', 'Route', 'Timetable'].map((model) => ({
      model,
      ops: buildCleaningOldData(agencyId, feedVersion),
    })),
    { model: 'Feed', ops: teardown(source) },
  ];
};

export default buildBulkOperations;
