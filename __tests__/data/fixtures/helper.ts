import { DatabaseInfo } from '~/data/db';

// data
import geosearchFixtures from './geosearch.json';
import relationsFixtures from './relations.json';

type Tfixtures = {
  [target: string]: {
    [model: string]: any[];
  };
};

const fixtures: Tfixtures = {
  geosearch: geosearchFixtures,
  relations: relationsFixtures,
};

export const importFixture = (db: DatabaseInfo, target: string) => {
  const fixture = fixtures[target];
  return Promise.all(
    Object.entries(fixture).map(([model, data]) =>
      db.connection.models[model].insertMany(data),
    ),
  );
};

export const deleteModelsData = (db: DatabaseInfo) => {
  const models = db.connection.modelNames();
  const promises = models.map((m) => db.connection.models[m].deleteMany({}));
  return Promise.all(promises);
};
