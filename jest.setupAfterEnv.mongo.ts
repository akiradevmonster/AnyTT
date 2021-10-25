import { connect, disconnect } from '~/data/db';

beforeAll(async () => {
  global.db = await connect();
});

afterAll(async () => {
  // const ret = await global.db.connection.dropDatabase();
  // if (ret) {
  await disconnect();
  // } else {
  //   throw new Error('error, cannot drop database.');
  // }
});
