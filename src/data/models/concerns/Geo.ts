import { createSchema, Type } from 'ts-mongoose';

const GeoSchema = createSchema(
  {
    type: Type.string(),
    coordinates: Type.array().of(Type.number()),
  },
  { _id: false },
);

export default GeoSchema;
