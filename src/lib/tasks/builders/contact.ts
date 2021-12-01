/* eslint-disable @typescript-eslint/camelcase */

export const generateContactId: (route_id: string, service_id: string) => string = (
  route_id,
  service_id,
) => `${route_id}-${service_id}`;

export default { generateContactId };
