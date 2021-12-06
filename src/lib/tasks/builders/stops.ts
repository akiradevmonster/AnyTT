// utils
import { CsvRowAsObj, parseCsvSync } from './utils';
import { BulkOperation } from '~/lib/types/mongodb.bulkOps';

type TparentToChildrenMap = {
  [parentId: string]: {
    name?: string;
    children: CsvRowAsObj[];
  };
};

export const combineStopName = (rows: CsvRowAsObj[]): CsvRowAsObj[] => {
  const parentToChildrenMap: TparentToChildrenMap = {};
  for (const row of rows) {
    if (row.location_type === '0') {
      // this is child-stop
      if (parentToChildrenMap[row.parent_station] == null) {
        parentToChildrenMap[row.parent_station] = {
          children: [row],
        };
      } else {
        parentToChildrenMap[row.parent_station].children.push(row);
      }
    } else if (row.location_type === '1') {
      // this is parent-stop
      if (parentToChildrenMap[row.stop_id] == null) {
        parentToChildrenMap[row.stop_id] = {
          name: row.stop_name,
          children: [],
        };
      } else {
        parentToChildrenMap[row.stop_id].name = row.stop_name;
      }
    }
  }
  return Object.keys(parentToChildrenMap).reduce(
    (results: CsvRowAsObj[], parentStopId: string): CsvRowAsObj[] => {
      const { name, children } = parentToChildrenMap[parentStopId];
      children.forEach((child, i) => {
        const suffix = child.stop_name === 'のりば' ? i + 1 : '';
        const stopName = `${name}${child.stop_name}${suffix}`;
        results.push({ ...child, stop_name: stopName });
      });
      return results;
    },
    [],
  );
};

export const buildOps = (
  data: CsvRowAsObj,
  agencyId: string,
  feedVersion: string,
): BulkOperation => ({
  updateOne: {
    filter: {
      __id: data.stop_id,
      __agencyId: agencyId,
    },
    update: {
      name: data.stop_name,
      loc: {
        type: 'Point',
        coordinates: [parseFloat(data.stop_lon), parseFloat(data.stop_lat)],
      },
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
  const csv = parseCsvSync(dirPath, 'stops.txt');
  const stops = combineStopName(csv);
  return stops.map((stop) => buildOps(stop, agencyId, feedVersion));
};

export default build;
