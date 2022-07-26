import { sumCoordinates } from "./sumCoordinates";

export default function playerCanchangeToDirection(currentDirection, nextDirection) {
    const result = sumCoordinates(currentDirection, nextDirection);
    return Object.keys(result).filter(coordinate => result[coordinate] !== 0).length > 0;
}