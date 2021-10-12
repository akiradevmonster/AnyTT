import { resolve } from 'path';
import { extractFeedVersion } from '~/lib/tasks/builders/feedInfo';

describe('builders/feed#extractFeedVersion', () => {
  it('should returning `feed_version`:string', async () => {
    const subject = await extractFeedVersion(resolve(__dirname, 'fixtures'));
    expect(subject).toBe('20200207_030906');
  });
});
