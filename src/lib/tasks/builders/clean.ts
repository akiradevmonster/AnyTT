// types
import { BulkOperation } from '~/lib/types/mongodb.bulkOps';

const build: (agencyId: string, feedVersion: string) => BulkOperation[] = (
  agencyId,
  feedVersion,
) => [
  {
    deleteMany: {
      filter: {
        __agencyId: agencyId,
        __feedVersion: {
          $ne: feedVersion,
        },
      },
    },
  },
];

export default build;
