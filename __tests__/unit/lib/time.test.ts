import { toSecFor4am } from '~/lib/time';

describe('lib/time', () => {
  describe('#toSecFor4am', () => {
    it('should returning number since 4am today', () => {
      const subject = toSecFor4am('10:49:00');
      expect(subject).toBe(24540); // (10 - 4) * (60 * 60) + 49 * 60
    });

    it('should returning over 24hs number when over midnight', () => {
      // (24 - 4) * (60 * 60) + 30 * 60
      expect(toSecFor4am('24:30:00')).toBe(73800);
      expect(toSecFor4am('00:30:00')).toBe(73800);
      // (25 - 4) * (60 * 60) + 30 * 60
      expect(toSecFor4am('25:30:00')).toBe(77400);
      expect(toSecFor4am('01:30:00')).toBe(77400);
    });
  });
});
