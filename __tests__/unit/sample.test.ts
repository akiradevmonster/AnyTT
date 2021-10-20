import { compilerOptions } from '../../tsconfig-jest.json';

const sum = (a: number, b: number): number => a + b;

describe('sample', () => {
  it('1 + 2 = 3', () => {
    expect(1 + 2).toBe(3);
  });

  it('sum(1, 2) = 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('tsconfig.compilerOptions.jsx === react', () => {
    expect(compilerOptions.jsx).toBe('react');
  });

  /*
  describe('.toStrictEqual vs .toMatchObject vs .objectContaining', () => {
    let subject: { position: { x: 0, y: 0 }, other?: string };
    let expected: { position: { x: 0, y: 0 }, other?: string };

    beforeEach(() => {
      subject = { position: { x: 0, y: 0 } };
      expected = { position: { x: 0, y: 0 } };
    });

    describe('same object', () => {
      it('.toStrictEqual', () => {
        expect(subject).toStrictEqual(expected);
      });

      it('.toMatchObject', () => {
        expect(subject).toMatchObject(expected);
      });

      it('.objectContaining', () => {
        expect(subject).toEqual(expect.objectContaining(expected));
      });
    });

    describe('difference object: subject has more props', () => {
      beforeEach(() => {
        subject.other = 'other prop';
      });

      it('.toStrictEqual', () => {
        expect(subject).toStrictEqual(expected);
      });

      it('.toMatchObject', () => {
        expect(subject).toMatchObject(expected);
      });

      it('.objectContaining', () => {
        expect(subject).toEqual(expect.objectContaining(expected));
      });
    });

    describe('difference object: expected has more props', () => {
      beforeEach(() => {
        expected.other = 'other prop';
      });

      it('.toStrictEqual', () => {
        expect(subject).toStrictEqual(expected);
      });

      it('.toMatchObject', () => {
        expect(subject).toMatchObject(expected);
      });

      it('.objectContaining', () => {
        expect(subject).toEqual(expect.objectContaining(expected));
      });
    });
  });
  */
});
