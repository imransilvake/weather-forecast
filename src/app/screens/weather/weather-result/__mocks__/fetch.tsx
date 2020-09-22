/**
 * mock success response
 */
const mockSuccessResponse = () => {
	return Promise.resolve<any>({
		current: {
			cod: 200,
			name: 'London',
			dt: 1600678800,
			dt_txt: '2020-09-21 09:00:00',
			weather: [
				{
					id: 721,
					main: 'Haze',
					description: 'haze',
					icon: '50d'
				}
			],
			main: {
				temp: 14,
				temp_min: 13.33,
				temp_max: 14.44
			}
		},
		forecast: {
			cod: '200',
			cnt: 40,
			city: {
				name: 'London',
				country: 'UK'
			},
			list: [
				{
					name: 'London',
					dt: 1600678800,
					dt_txt: '2020-09-21 09:00:00',
					weather: [
						{
							id: 721,
							main: 'Haze',
							description: 'haze',
							icon: '50d'
						}
					],
					main: {
						temp: 14,
						temp_min: 13.33,
						temp_max: 14.44
					}
				}
			]
		}
	});
};

/**
 * mock fail response
 */
const mockFailResponse = () => {
	return Promise.reject({
		cod: '404',
		message: 'city not found'
	});
};

export {
	mockSuccessResponse,
	mockFailResponse
};
