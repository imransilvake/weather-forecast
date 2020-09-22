// app
import ENV from './environment';

// general
export const AppOptions = {
	DEFAULT_CITY: 'london',
	API_KEY: 'e53f909dc7af6030d4830fe76a876f32',
	CACHE_MINS: 10
};

// services
export const AppServices = {
	WEATHER: {
		GET_WEATHER: {
			URL: `${ENV().REST_API}/weather`
		},
		GET_FORECAST: {
			URL: `${ENV().REST_API}/forecast`
		}
	}
};
