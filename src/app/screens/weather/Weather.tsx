// react
import React, { FC } from 'react';

// app
import './Weather.scss';
import WeatherForm from './weather-form/WeatherForm';
import WeatherResult from './weather-result/WeatherResult';

const Weather: FC = () => {
	return (
		<section className="wf-wrapper">
			{/* Form */}
			<WeatherForm />

			{/* Result */}
			<WeatherResult />
		</section>
	);
};
export default Weather;
