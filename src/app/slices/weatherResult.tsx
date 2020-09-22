// redux
import { createSlice } from '@reduxjs/toolkit';

// app
import { WeatherResultInterface, WRDataForecastInterface, WRItemInterface } from '../screens/weather/weather-result/weatherResult.interface';
import { roundToHours } from '../utilities/Helpers';
import moment from 'moment';

// initial state
export const initialState: WeatherResultInterface = {
	loading: false,
	data: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'weatherResult',
	initialState,
	reducers: {
		dataLoading: (state) => {
			state.loading = true;
		},
		dataSuccess: (state, { payload }) => {
			state.loading = false;
			state.data = {
				...payload,
				forecast: {
					...payload.forecast,
					list: prepareFiveDaysForcastResponse(payload.forecast)
				}
			};
			state.errors = null;
		},
		dataFailure: (state, { payload }) => {
			state.loading = false;
			state.data = null;
			state.errors = payload;
		},
		resetResult: () => initialState
	}
});

// actions
export const { dataLoading, dataSuccess, dataFailure, resetResult } = dataSlice.actions;

// reducer
export default dataSlice.reducer;

/**
 * prepare five day forcast response
 * @param payload
 */
const prepareFiveDaysForcastResponse = (payload: WRDataForecastInterface) => {
	// round to 3 hours
	const roundedHrs = roundToHours(moment().toDate(), 3);
	const roundedTime = moment(roundedHrs).format('HH:mm:ss');

	// return result
	return payload && payload.list && payload.list.length && payload.list
		.filter(
			(item: WRItemInterface) => item.dt_txt.endsWith(roundedTime)
		);
};
