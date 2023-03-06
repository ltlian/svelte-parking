import axios from 'axios';
import { statsMonAzureConfig } from './datasets/stavanger-parkering/config';
import type { ParkingAvailabilityRecord } from './datasets/stavanger-parkering/ParkingAvailabilityRecord';

export interface openComConfig {
	baseUrl: string;
	url: string;
}

const api = axios.create({
	baseURL: statsMonAzureConfig.baseUrl,
	headers: {
		Accept: 'application/json'
	}
});

export async function getParking() {
	let response = await api.get(statsMonAzureConfig.url);
	if (response.status == 200) {
		return response.data as ParkingAvailabilityRecord[];
	} else {
		throw new Error(response.statusText);
	}
}
