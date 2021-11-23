import { createSchema, Type, typedModel } from 'ts-mongoose';

export const RouteSchema = createSchema(
  {
    __id: Type.string({ required: true, unique: true, index: true }),
    origin: Type.string(),
    via: Type.string(),
    destination: Type.string(),
    headsign: Type.string(),
    __routeId: Type.string({ index: true }),
    __pRouteId: Type.string({ index: true }),
    __serviceId: Type.string({ index: true }),
    __tripIds: Type.array().of(Type.string()),
    __agencyId: Type.string({ index: true }),
    __feedVersion: Type.string({ index: true }),
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

RouteSchema.virtual('timetables', {
  ref: 'Timetable',
  localField: '__id',
  foreignField: '__contactId',
});

export const collectionName = 'Route';
export const Route = typedModel(collectionName, RouteSchema);

export default Route;
