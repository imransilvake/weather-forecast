// react
import React, { FC } from 'react';

// app
import I01d from '../../../../assets/svg/01d.svg';
import I02d from '../../../../assets/svg/02d.svg';
import I03d from '../../../../assets/svg/03d.svg';
import I04d from '../../../../assets/svg/04d.svg';
import I09d from '../../../../assets/svg/09d.svg';
import I10d from '../../../../assets/svg/10d.svg';
import I11d from '../../../../assets/svg/11d.svg';
import I13d from '../../../../assets/svg/13d.svg';
import I50d from '../../../../assets/svg/50d.svg';

/**
 * get weather icon
 * @param icon
 */
const getWeatherIcon = (icon: string) => {
	switch (icon) {
		case '01d':
		case '01n': return I01d;
		case '02d':
		case '02n': return I02d;
		case '03d':
		case '03n': return I03d;
		case '04d':
		case '04n': return I04d;
		case '09d':
		case '09n': return I09d;
		case '10d':
		case '10n': return I10d;
		case '11d':
		case '11n': return I11d;
		case '13d':
		case '13n': return I13d;
		case '50d':
		case '50n': return I50d;

		default: break;
	}
	return I01d;
};

/**
 * set weather image
 * @param icon
 */
const WeatherIcon: FC<string> = (icon, alt) => {
	return (
		<img src={getWeatherIcon(icon)} alt={alt} />
	);
};
export default WeatherIcon;
