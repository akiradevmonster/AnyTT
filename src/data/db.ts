import mongoose, { Schema, Document, Model, Connection } from 'mongoose';
import { Extract } from 'ts-mongoose';

// models
import { StopSchema } from './models/Stop';
import { TimetableSchema } from './models/Timetable';
import { RouteSchema } from './models/Route';
import { AgencySchema } from './models/Agency';
import { FeedSchema } from './models/Feed';

export type DatabaseInfo = {
  connection: Connection;
  models: Connection['models'];
};

export const connectedTypedModel: <
  T extends Schema,
  S extends { [name: string]: Function }
>(
  connection: Connection,
  name: string,
  schema?: T,
  statics?: S & ThisType<Model<Document & Extract<T>>>,
) => Model<Document & Extract<T>> & S = (connection, name, schema, statics) => {
  if (schema && statics) {
    // eslint-disable-next-line no-param-reassign
    schema.statics = statics;
  }
  return connection.model(name, schema) as any;
};

export const createModels: (connection: Connection) => DatabaseInfo['models'] = (
  connection,
) => ({
  Stop: connectedTypedModel(connection, 'Stop', StopSchema),
  Timetable: connectedTypedModel(connection, 'Timetable', TimetableSchema),
  Route: connectedTypedModel(connection, 'Route', RouteSchema),
  Agency: connectedTypedModel(connection, 'Agency', AgencySchema),
  Feed: connectedTypedModel(connection, 'Feed', FeedSchema),
});

export const connect = async (): Promise<DatabaseInfo> => {
  let { connection } = mongoose;
  if (connection.readyState !== connection.states.connected) {
    if (process.env.MONGODB_URI == null) {
      throw new Error('MONGODB_URI environment variable is required.');
    }
    connection = await mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  }

  createModels(connection);

  return { connection, models: connection.models };
};

export const disconnect = async () => {
  await mongoose.disconnect();
};

export default connect;
