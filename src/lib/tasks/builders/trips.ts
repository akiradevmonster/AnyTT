// utils
import { CsvRowAsObj, parseCsvSync } from './utils';
import { BulkOperation } from '~/lib/types/mongodb.bulkOps';
import { generateContactId } from './contact';

export type CombinedTripIds = {
  id: string;
  route_id: string;
  service_id: string;
  tripIds: string[];
};
type TcombinedTripIds = { [k: string]: CombinedTripIds };

export const combineTripIds: (rows: CsvRowAsObj[]) => CombinedTripIds[] = (rows) => {
  const mapper: TcombinedTripIds = {};
  for (const row of rows) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const { route_id, service_id, trip_id } = row;
    const id = generateContactId(route_id, service_id);
    if (mapper[id] == null) {
      mapper[id] = { id, route_id, service_id, tripIds: [] };
    }
    mapper[id].tripIds.push(trip_id);
  }
  return Object.values(mapper).map((m) => {
    m.tripIds.sort();
    return m;
  });
};

export const buildOps = (
  data: CombinedTripIds,
  agencyId: string,
  feedVersion: string,
): BulkOperation => ({
  updateOne: {
    filter: {
      __id: data.id,
      __agencyId: agencyId,
    },
    update: {
      __routeId: data.route_id,
      __serviceId: data.service_id,
      __tripIds: data.tripIds,
      __feedVersion: feedVersion,
    },
    upsert: true,
  },
});

const build: (
  dirPath: string,
  agencyId: string,
  feedVersion: string,
) => BulkOperation[] = (dirPath, agencyId, feedVersion) => {
  const csv = parseCsvSync(dirPath, 'trips.txt');
  return combineTripIds(csv).map((row) => buildOps(row, agencyId, feedVersion));
};

export default build;

export type TtripToRouteAndServiceMap = {
  [tripId: string]: {
    route_id: string;
    service_id: string;
  };
};

export const mapTripToRouteAndService: (dirPath: string) => TtripToRouteAndServiceMap = (
  dirPath,
) => {
  const csv = parseCsvSync(dirPath, 'trips.txt');
  return csv.reduce(
    (results: TtripToRouteAndServiceMap, row) => ({
      ...results,
      [row.trip_id]: {
        route_id: row.route_id,
        service_id: row.service_id,
      },
    }),
    {},
  );
};
