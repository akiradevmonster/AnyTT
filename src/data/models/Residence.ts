import { createSchema, Type, ExtractDoc, ExtractProps, typedModel } from 'ts-mongoose';
import { RoutingDocument } from './Routing';

export const ResidenceSchema = createSchema(
  {
    slug: Type.string({ required: true, unique: true, index: true }),
    name: Type.string({ required: true }),
    ...({} as { stops: RoutingDocument }),
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

ResidenceSchema.virtual('stops', {
  ref: 'Routing',
  localField: '_id',
  foreignField: 'residence',
});

export const collectionName = 'Residence';
export const Residence = typedModel(collectionName, ResidenceSchema);

// class ResidenceClass extends Model {}
// ResidenceSchema.loadClass(ResidenceClass);

export type ResidenceDocument = ExtractDoc<typeof ResidenceSchema>;
export type ResidenceProps = ExtractProps<typeof ResidenceSchema>;
export type ResidenceModel = typeof Residence;

export default Residence;
