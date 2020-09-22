// app
import { AppOptions, AppServices } from '../../../../app.config';
import { mockSuccessResponse, mockFailResponse } from './__mocks__/fetch';

test('[API] validate API status code 200', async () => {
	// mock fetch
	jest.spyOn(window, 'fetch')
		.mockImplementationOnce(mockSuccessResponse)
		.mockImplementationOnce(mockSuccessResponse);

	// query params
	const queryParams = `?q=London&appid=${AppOptions.API_KEY}&units=metric`;

	// call apis in batch
	await Promise.all([
		fetch(`${AppServices.WEATHER.GET_WEATHER.URL}${queryParams}`),
		fetch(`${AppServices.WEATHER.GET_FORECAST.URL}${queryParams}`)
	]).then(async ([res1, res2]) => {
		const response1: any = res1;
		const response2: any = res2;
		expect(response1['current']['cod']).toBe(200);
		expect(response2['forecast']['cod']).toBe('200');
	});
});

test('[API] validate API status code 404', async () => {
	// mock fetch
	jest.spyOn(window, 'fetch')
		.mockImplementationOnce(mockFailResponse)
		.mockImplementationOnce(mockFailResponse);

	// query params
	const queryParams = `?q=empty&appid=${AppOptions.API_KEY}&units=metric`;

	// call apis in batch
	await Promise.all([
		fetch(`${AppServices.WEATHER.GET_WEATHER.URL}${queryParams}`),
		fetch(`${AppServices.WEATHER.GET_FORECAST.URL}${queryParams}`)
	]).catch((err) => {
		expect(err['cod']).toBe('404');
		expect(err['message']).toBe('city not found');
	});
});
