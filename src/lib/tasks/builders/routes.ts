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
      __pRouteId: data.jp_parent_route_id,
      headsign: data.route_short_name,
    },
  },
});

const build: (dirPath: string, agencyId: string) => BulkOperation[] = (
  dirPath,
  agencyId,
) => {
  const csv = parseCsvSync(dirPath, 'routes.txt');
  return csv.map((row) => buildOps(row, agencyId));
};

export default build;
