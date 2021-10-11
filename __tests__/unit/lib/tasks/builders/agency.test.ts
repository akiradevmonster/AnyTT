import { resolve } from 'path';
import { extractAgencyId } from '~/lib/tasks/builders/agency';

describe('builders/agency#extractAgencyId', () => {
  it('should returning `agency_id`:string', async () => {
    const subject = await extractAgencyId(resolve(__dirname, 'fixtures'));
    expect(subject).toBe('8000020130001');
  });
});
