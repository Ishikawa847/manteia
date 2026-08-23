import {AXIS_IDS, type Coordinate} from "../types.ts";

export const distance = (a: Coordinate, b: Coordinate): number => {
    let sum :number = 0
    AXIS_IDS.forEach((axis) => sum += (a[axis] - b[axis])**2)
    return sum
}
