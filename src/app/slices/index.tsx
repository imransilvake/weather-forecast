// redux
import { combineReducers } from 'redux';

// app
import { WeatherResultInterface } from '../screens/weather/weather-result/weatherResult.interface';
import weatherForm, { WeatherFormInterface } from './weatherForm';
import weatherResult from './weatherResult';

// combine reducers
const rootReducer = combineReducers({
	weatherForm,
	weatherResult
});

// root state
export interface RootState {
	weatherForm: WeatherFormInterface;
	weatherResult: WeatherResultInterface;
}

// export root reducer
export default rootReducer;
