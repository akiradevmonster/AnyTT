import { createSchema, Type, typedModel } from 'ts-mongoose';

export const AgencySchema = createSchema(
  {
    __id: Type.string({ required: true, unique: true, index: true }),
    key: Type.string({ index: true }),
    name: Type.string(),
    url: Type.string(),
    feed: Type.objectId({ ref: 'Agency', index: true }),
  },
  { timestamps: true },
);

export const collectionName = 'Agency';
export const Agency = typedModel(collectionName, AgencySchema);

export default Agency;
