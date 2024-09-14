import '@testing-library/jest-dom';
import { hexToRGBA } from './utils';

// should error if no error is thrown
const failTest = () => expect(true).toBe(false);

describe('theme/utils.ts::hexToRGBA', () => {
  it('returns a converted rgba given a valid hexCode and opacity', () => {
    expect(hexToRGBA('#ffffff', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
  });

  it('returns a converted rgba given a valid hexCode of 3 characters', () => {
    expect(hexToRGBA('#fff', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
  });

  it('throws when given an invalid hexCode and a valid opacity', () => {
    try {
      hexToRGBA('#ggg', 0.5);

      failTest();
    } catch (error) {
      expect((error as Error).message).toBe('Invalid red hex value: NaN');
    }
  });

  it('throws when given a hexCode value length lower than 3', () => {
    try {
      hexToRGBA('#ff', 0.5);

      failTest();
    } catch (error: unknown) {
      if (error) {
        expect((error as Error).message).toBe('Invalid hexCode: #ff');
      }
    }
  });

  it('throws when given a hexCode value length greater than 6', () => {
    try {
      hexToRGBA('#abcdefg', 0.5);

      failTest();
    } catch (error: unknown) {
      if (error) {
        expect((error as Error).message).toBe('Invalid hexCode: #abcdefg');
      }
    }
  });

  it('throws when given a hexCode value length less than 6 and greater than 3', () => {
    try {
      hexToRGBA('#abcd', 0.5);

      failTest();
    } catch (error) {
      expect((error as Error).message).toBe('Invalid hexCode: #abcd');
    }
  });

  it('throws when given a valid hexCode and a negative opacity', () => {
    try {
      hexToRGBA('#fff', -1);

      failTest();
    } catch (error) {
      expect((error as Error).message).toBe('Invalid Opacity: -1');
    }
  });

  it('throws when given a valid hexCode and an opacity greater than 100', () => {
    try {
      hexToRGBA('#fff', 101);

      failTest();
    } catch (error) {
      expect((error as Error).message).toBe('Invalid Opacity: 101');
    }
  });

  it('throws when given an invalid red value in the hexCode', () => {
    try {
      hexToRGBA('#ggffff', 0.5);

      failTest();
    } catch (error) {
      expect((error as Error).message).toBe('Invalid red hex value: NaN');
    }
  });

  it('throws when given an invalid green value in the hexCode', () => {
    try {
      hexToRGBA('#ffggff', 0.5);

      failTest();
    } catch (error) {
      expect((error as Error).message).toBe('Invalid green hex value: NaN');
    }
  });

  it('throws when given an invalid blue value in the hexCode', () => {
    try {
      hexToRGBA('#ffffgg', 0.5);

      failTest();
    } catch (error) {
      expect((error as Error).message).toBe('Invalid blue hex value: NaN');
    }
  });
});
