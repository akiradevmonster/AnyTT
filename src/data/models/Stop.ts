import { createSchema, Type, typedModel } from 'ts-mongoose';

import GeoSchema from './concerns/Geo';

export const StopSchema = createSchema(
  {
    __id: Type.string({ required: true, unique: true, index: true }),
    name: Type.string({ required: true, index: true }),
    loc: Type.schema({ index: '2dsphere' }).of(GeoSchema),
    __agencyId: Type.string({ index: true }),
    __feedVersion: Type.string({ index: true }),
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

StopSchema.virtual('timetables', {
  ref: 'Timetable',
  localField: '__id',
  foreignField: '__stopId',
});

export const collectionName = 'Stop';
export const Stop = typedModel(collectionName, StopSchema);

export default Stop;
