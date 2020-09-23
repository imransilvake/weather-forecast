// react
import React, { FC } from 'react';

// app
import './Weather.scss';
import WeatherForm from './weather-form/WeatherForm';
import WeatherResult from './weather-result/WeatherResult';

const Weather: FC = () => {
	return (
		<div className="wf-wrapper">
			{/* Form */}
			<WeatherForm />

			{/* Result */}
			<WeatherResult />
		</div>
	);
};
export default Weather;
