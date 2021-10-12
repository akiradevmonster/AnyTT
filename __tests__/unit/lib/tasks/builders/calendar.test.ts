import { convertSchedule, DayOfWeek, ScheduleDays } from '~/lib/tasks/builders/calendar';

describe('builders/calendar#convertSchedule', () => {
  it('should returning `schedule[]', () => {
    const expected: DayOfWeek[] = [1, 2, 3, 4, 5]; // week-day;
    const subject: ScheduleDays = {
      monday: '1',
      tuesday: '1',
      wednesday: '1',
      thursday: '1',
      friday: '1',
      saturday: '0',
      sunday: '0',
    };
    expect(convertSchedule(subject)).toStrictEqual(expected);
  });

  it('should returning empty array', () => {
    const expected: DayOfWeek[] = [];
    const subject: ScheduleDays = {
      monday: '0',
      tuesday: '0',
      wednesday: '0',
      thursday: '0',
      friday: '0',
      saturday: '0',
      sunday: '0',
    };
    expect(convertSchedule(subject)).toStrictEqual(expected);
  });
});
