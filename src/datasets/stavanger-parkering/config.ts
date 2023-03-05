import type { openComConfig } from '../../openComClient';

export const statsMonAzureConfig: openComConfig = {
	baseUrl: 'https://statsmon-api.azurewebsites.net',
	url: 'parkingAvailability',
};

export const statsMonLocalConfig: openComConfig = {
	baseUrl: 'http://localhost:5078',
	url: 'parkingAvailability',
};
