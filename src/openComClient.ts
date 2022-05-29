import axios from 'axios';
import stavangerParkeringConfig from './datasets/stavanger-parkering/config';

export interface openComConfig {
	url: string;
}

const api = axios.create({
	baseURL: 'https://opencom.no/dataset'
});

export async function getParking() {
	let response = await api.get(stavangerParkeringConfig.url);
	if (response.status == 200) {
		return response.data as ParkeringReportItem[];
	} else {
		throw new Error(response.statusText);
	}
}
