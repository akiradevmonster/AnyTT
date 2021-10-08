import { DatabaseInfo } from '~/data/db';
import { importFixture, deleteModelsData } from '../fixtures/helper';

describe('geo location of Stop', () => {
  let Stop: DatabaseInfo['models']['Stop'];
  beforeEach(async () => {
    const { db } = global;
    await importFixture(db, 'geosearch');
    Stop = db.models.Stop;
  });

  it('imported fixtures count', async () => {
    expect(await Stop.countDocuments()).toBe(3);
  });

  it('near Shimbashi station', async () => {
    const expected = ['0737-01', '0737-02'];
    const box = [
      // Shimbashi station area
      [139.7581135117538, 35.66772258808171],
      [139.75967264437043, 35.66560601340291],
    ];
    const stops = await Stop.where('loc').within({ box }).select('__id');
    expect(stops).toEqual(
      expect.arrayContaining(expected.map((__id) => expect.objectContaining({ __id }))),
    );
  });

  afterEach(async () => {
    await deleteModelsData(global.db);
  });
});
