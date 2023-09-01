export function milesToMeters(i: number): number {
  return i * 0.000621371192;
}

export function metersToMiles(i: number): number {
  return i * 1609.344;
}

export function roundNumber(num: number) {
  return Math.round(num * 100) / 100;
}
