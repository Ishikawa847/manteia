import {AXIS_IDS, type Philosopher, type Coordinate, type PhilosopherId} from "../types.ts";

export const distance = (a: Coordinate, b: Coordinate): number => {
    let sum :number = 0
    AXIS_IDS.forEach((axis) => sum += (a[axis] - b[axis])**2)
    return sum
}

export const nearestPhilosopher = (target: Coordinate, philosophers: readonly Philosopher[]
): PhilosopherId => {
   let minimum = philosophers.reduce((acc, cur) => distance(target,cur["coordinate"]) >= distance(target, acc["coordinate"]) ?
      acc : cur)
    return minimum["id"]
}
