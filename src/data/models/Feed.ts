import { createSchema, Type, typedModel } from 'ts-mongoose';

export const FeedSchema = createSchema(
  {
    key: Type.string({ required: true, unique: true, index: true }),
    uri: Type.string({ required: true, unique: true, index: true }),
    version: Type.string({ index: true }),
    inProcessing: Type.boolean({ default: false }),
  },
  { timestamps: true },
);

export const collectionName = 'Feed';
export const Feed = typedModel(collectionName, FeedSchema);

export default Feed;
