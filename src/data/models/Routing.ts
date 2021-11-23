import { createSchema, Type, ExtractDoc, ExtractProps, typedModel } from 'ts-mongoose';

export const RoutingSchema = createSchema({
  residence: Type.objectId({ required: true, ref: 'Residence', index: true }),
  stop: Type.objectId({ required: true, ref: 'Stop', index: true }),
  distance: Type.number({ required: true }),
});

export const collectionName = 'Routing';
export const Routing = typedModel(collectionName, RoutingSchema);

// class RoutingClass extends Model {}
// RoutingSchema.loadClass(RoutingClass);

export type RoutingDocument = ExtractDoc<typeof RoutingSchema>;
export type RoutingProps = ExtractProps<typeof RoutingSchema>;
export type RoutingModel = typeof Routing;

export default Routing;
