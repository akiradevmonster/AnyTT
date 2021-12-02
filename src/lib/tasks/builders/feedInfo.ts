// types
import { BulkOperation } from '~/lib/types/mongodb.bulkOps';
import { GtfsSourceIdentifier } from '../tasks.config';

// utils
import { CsvRowAsObj, parseCsvSync } from './utils';

export const buildOpsForSetup = (
  data: CsvRowAsObj,
  source: GtfsSourceIdentifier,
): BulkOperation => ({
  updateOne: {
    filter: { uri: source.uri },
    update: { key: source.key, version: data.feed_version, inProcessing: true },
    upsert: true,
  },
});

export const extractFeedVersion = (dirPath: string): string => {
  const csv = parseCsvSync(dirPath, 'feed_info.txt');
  return csv[0].feed_version;
};

export const setup: (source: GtfsSourceIdentifier, dirPath: string) => BulkOperation[] = (
  source,
  dirPath,
) => {
  const csv = parseCsvSync(dirPath, 'feed_info.txt');
  return [buildOpsForSetup(csv[0], source)];
};

export const buildOpsForTeardown = (uri: string): BulkOperation => ({
  updateOne: {
    filter: { uri },
    update: { inProcessing: false },
  },
});

export const teardown = (source: GtfsSourceIdentifier): BulkOperation[] => [
  buildOpsForTeardown(source.uri),
];
