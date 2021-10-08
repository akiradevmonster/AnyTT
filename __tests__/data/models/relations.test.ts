import { DatabaseInfo } from '~/data/db';
import { importFixture, deleteModelsData } from '../fixtures/helper';

describe('Relations between Stop/Route/Timetable', () => {
  let Stop: DatabaseInfo['models']['Stop'];
  let Route: DatabaseInfo['models']['Route'];
  let Timetable: DatabaseInfo['models']['Timetable'];

  beforeEach(async () => {
    const { db } = global;
    await importFixture(db, 'relations');
    Stop = db.models.Stop;
    Route = db.models.Route;
    Timetable = db.models.Timetable;
  });

  afterEach(async () => {
    await deleteModelsData(global.db);
  });

  it('imported fixtures count', async () => {
    expect(await Stop.countDocuments()).toBe(1);
    expect(await Route.countDocuments()).toBe(1);
    expect(await Timetable.countDocuments()).toBe(1);
  });

  it('Stop has many Timetables', async () => {
    const stop = await Stop.findOne().populate('timetables');
    expect(stop.timetables).toHaveLength(1);
    const { __id } = stop;
    expect(stop).toHaveProperty(['timetables', 0, '__stopId'], __id);
  });

  it('Timetable belongs to Stop', async () => {
    const timetable = await Timetable.findOne().populate('stop');
    const { __stopId } = timetable;
    expect(timetable).toHaveProperty(['stop', '__id'], __stopId);
  });

  it('Route has many Timetables', async () => {
    const route = await Route.findOne().populate('timetables');
    expect(route.timetables).toHaveLength(1);
    const { __id } = route;
    expect(route).toHaveProperty(['timetables', 0, '__contactId'], __id);
  });

  it('Timetable belongs to Route', async () => {
    const timetable = await Timetable.findOne().populate('route');
    const { __routeId, __serviceId } = timetable;
    expect(timetable).toHaveProperty(['route', '__routeId'], __routeId);
    expect(timetable).toHaveProperty(['route', '__serviceId'], __serviceId);
  });
});
