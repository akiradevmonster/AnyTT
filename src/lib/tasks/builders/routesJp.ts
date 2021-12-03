// utils
import { CsvRowAsObj, parseCsvSync } from './utils';
import { BulkOperation } from '~/lib/types/mongodb.bulkOps';

export const buildOps = (data: CsvRowAsObj, agencyId: string): BulkOperation => ({
  updateMany: {
    filter: {
      __routeId: data.route_id,
      __agencyId: agencyId,
    },
    update: {
      origin: data.origin_stop,
      via: data.via_stop,
      destination: data.destination_stop,
    },
  },
});

const build: (dirPath: string, agencyId: string) => BulkOperation[] = (
  dirPath,
  agencyId,
) => {
  const csv = parseCsvSync(dirPath, 'routes_jp.txt');
  return csv.map((row) => buildOps(row, agencyId));
};

export default build;
