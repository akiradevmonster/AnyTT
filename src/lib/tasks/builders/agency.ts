// types
import { BulkOperation } from '~/lib/types/mongodb.bulkOps';
import { GtfsSourceIdentifier } from '../tasks.config';

// utils
import { CsvRowAsObj, parseCsvSync } from './utils';

export const buildOps = (data: CsvRowAsObj, key: string): BulkOperation => ({
  updateOne: {
    filter: { __id: data.agency_id },
    update: { key, name: data.agency_name, url: data.agency_url },
    upsert: true,
  },
});

export const extractAgencyId = (dirPath: string): string => {
  const csv = parseCsvSync(dirPath, 'agency.txt');
  return csv[0].agency_id;
};

const build: (source: GtfsSourceIdentifier, dirPath: string) => BulkOperation[] = (
  source,
  dirPath,
) => {
  const csv = parseCsvSync(dirPath, 'agency.txt');
  return [buildOps(csv[0], source.key)];
};

export default build;
