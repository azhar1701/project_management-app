import { describe, it, expect } from 'vitest';
import { calculatePeakDischarge } from './calculations';

describe('Hydrological Calculations Engine', () => {
    describe('calculatePeakDischarge (Rational Method)', () => {
        it('calculates Q correctly for standard watershed inputs', () => {
            // Test Case 1: Q = (0.75 * 120 * 45.5) / 3.6 = 1137.5
            expect(calculatePeakDischarge(0.75, 120, 45.5)).toBe(1137.50);

            // Test Case 2: Q = (0.90 * 60 * 10) / 3.6 = 150
            expect(calculatePeakDischarge(0.90, 60, 10)).toBe(150.00);
        });

        it('returns 0 for unphysical negative inputs', () => {
            expect(calculatePeakDischarge(-0.75, 120, 45)).toBe(0);
            expect(calculatePeakDischarge(0.75, -120, 45)).toBe(0);
            expect(calculatePeakDischarge(0.75, 120, -45)).toBe(0);
        });

        it('returns 0 if any core parameter is 0', () => {
            expect(calculatePeakDischarge(0, 120, 45)).toBe(0);
            expect(calculatePeakDischarge(0.75, 0, 45)).toBe(0);
            expect(calculatePeakDischarge(0.75, 120, 0)).toBe(0);
        });
    });
});
