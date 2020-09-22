// redux
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// app
import rootReducer from '../../../slices';
import { formInputUpdate } from '../../../slices/weatherForm';

// store
const store = configureStore({
	reducer: rootReducer,
	middleware: [...getDefaultMiddleware({
		serializableCheck: false,
		immutableCheck: false
	})]
});

test('[Form] validate cityName by setting it to "London"', () => {
	// dispatch
	store.dispatch(formInputUpdate('London'));

	expect(store.getState()['weatherForm'].cityName).toBe('London');
});
