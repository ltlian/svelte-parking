import type { Coordinate } from './Coordinate';

export interface ParkingAvailabilityRecord {
	timestamp: string;
	area: string;
	coordinates: Coordinate;
	availableSpaces: number;
}
