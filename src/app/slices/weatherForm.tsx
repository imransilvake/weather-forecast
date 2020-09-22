// redux
import { createSlice } from '@reduxjs/toolkit';

// weather form interface
export interface WeatherFormInterface {
    cityName: string;
}

// initial state
export const initialState: WeatherFormInterface = {
	cityName: ''
};

// slice
const dataSlice = createSlice({
	name: 'weatherForm',
	initialState,
	reducers: {
		formInputUpdate: (state, action) => {
			state.cityName = action.payload;
		},
		resetForm: () => initialState
	}
});

// actions
export const { formInputUpdate, resetForm } = dataSlice.actions;

// reducer
export default dataSlice.reducer;
