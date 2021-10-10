import { resolve } from 'path';
import { DatabaseInfo } from '~/data/db';

// operations
import buildStopOps from '~/lib/tasks/builders/stops';
import buildCleaningOldData from '~/lib/tasks/builders/clean';
import { deleteModelsData } from './fixtures/helper';

// fixtures
const oldDataDirPath = resolve(__dirname, 'fixtures/gtfs/old');
const newDataDirPath = resolve(__dirname, 'fixtures/gtfs/new');

describe('Bulk importing operation (GTFS)', () => {
  const agencyId = 'agency';
  const oldFeedVersion = 'v1';
  const newFeedVersion = 'v2';

  let Stop: DatabaseInfo['models']['Stop'];
  beforeEach(async () => {
    const { db } = global;
    Stop = db.models.Stop;
    const oldOps = buildStopOps(oldDataDirPath, agencyId, oldFeedVersion);
    await Stop.bulkWrite(oldOps);
  });

  afterEach(async () => {
    await deleteModelsData(global.db);
  });

  it('created(added), should `upsert` new data', async () => {
    const newOps = buildStopOps(newDataDirPath, agencyId, newFeedVersion);
    const cleanOps = buildCleaningOldData(agencyId, newFeedVersion);
    const subject = await Stop.bulkWrite(newOps);
    await Stop.bulkWrite(cleanOps);
    expect(subject).toHaveProperty('result.ok', 1);
    expect(subject).toHaveProperty('upsertedCount', 1);
  });

  it('updated(changed), should overrides data', async () => {
    const newOps = buildStopOps(newDataDirPath, agencyId, newFeedVersion);
    const cleanOps = buildCleaningOldData(agencyId, newFeedVersion);
    const subject = await Stop.bulkWrite(newOps);
    await Stop.bulkWrite(cleanOps);
    expect(subject).toHaveProperty('result.ok', 1);
    expect(subject).toHaveProperty('modifiedCount', 1);
  });

  it('deleted(removed), should removes old version data', async () => {
    const newOps = buildStopOps(newDataDirPath, agencyId, newFeedVersion);
    const cleanOps = buildCleaningOldData(agencyId, newFeedVersion);
    const prepare = await Stop.bulkWrite(newOps);
    const subject = await Stop.bulkWrite(cleanOps);
    expect(prepare).toHaveProperty('result.ok', 1);
    expect(subject).toHaveProperty('result.ok', 1);
    expect(subject).toHaveProperty('deletedCount', 1);
  });
});
