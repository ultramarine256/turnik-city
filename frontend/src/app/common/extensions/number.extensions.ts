export class NumberExtensions {
  static milesToMeters(i: number): number {
    return i * 0.000621371192;
  }

  static metersToMiles(i: number): number {
    return i * 1609.344;
  }

  static roundNumber(num: number) {
    return Math.round(num * 100) / 100;
  }
}
