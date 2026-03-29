/**
 * Applies the Rational Method to calculate peak discharge.
 * Formula: Q = C * I * A / 3.6 (Metric Standard)
 * 
 * @param c Runoff Coefficient (dimensionless, 0-1)
 * @param i Rainfall Intensity (mm/hr)
 * @param a Catchment Area (km²)
 * @returns Peak Discharge (Q) in cubic meters per second (m³/s)
 */
export function calculatePeakDischarge(c: number, i: number, a: number): number {
    // Validate inputs to prevent unphysical calculations
    if (c < 0 || i < 0 || a < 0) return 0;

    // Rational formula calculation
    const q = (c * i * a) / 3.6;

    // Return rounded to 2 decimal places to simulate precision limits
    return Number(q.toFixed(2));
}
