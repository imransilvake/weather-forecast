// react
import React, { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material
import CircularProgress from '@material-ui/core/CircularProgress';

// app
import './WeatherResult.scss';
import WeatherIcon from './WeatherIcon';
import PinIcon from '../../../../assets/svg/pin.svg';
import { AppOptions, AppServices } from '../../../../app.config';
import { WRDataInterface, WRItemInterface } from './weatherResult.interface';
import { convertToDay } from '../../../utilities/Helpers';
import { dataFailure, dataLoading, dataSuccess } from '../../../slices/weatherResult';
import { RootState } from '../../../slices';
import moment from 'moment';

const WeatherResult: FC = () => {
	// hooks
	const dispatch = useDispatch();
	const { cityName } = useSelector((state: RootState) => state.weatherForm);
	const { data, loading, errors } = useSelector((state: RootState) => state.weatherResult);
	const cache: any = useRef();

	useEffect(() => {
		// fetch cached response from local storage
		if (!cityName && !cache.current) {
			const cachedResponse = localStorage.getItem('weatherCache');
			cache.current = cachedResponse ? JSON.parse(cachedResponse) : {};
		}

		// city name
		const city = (cityName && cityName.toLowerCase()) || AppOptions.DEFAULT_CITY;

		// dispatch loader
		dispatch(dataLoading());

		// validate cache and get minutes
		const minutes = cache.current[city] && moment().diff(moment(new Date(cache.current[city].time)), 'minutes');
		if (minutes !== undefined && minutes <= AppOptions.CACHE_MINS) {
			// dispatch success
			dispatch(dataSuccess(cache.current[city]));
		} else {
			// query params
			const queryParams = `?q=${city}&appid=${AppOptions.API_KEY}&units=metric`;

			// call apis in batch
			Promise.all([
				fetch(`${AppServices.WEATHER.GET_WEATHER.URL}${queryParams}`),
				fetch(`${AppServices.WEATHER.GET_FORECAST.URL}${queryParams}`)
			]).then(async ([res1, res2]) => {
				// json responses
				const current = await res1.json();
				const forecast = await res2.json();

				// validate: 200 status code
				if (current['cod'] !== '200' && forecast['cod'] !== '200') {
					// dispatch error
					dispatch(dataFailure(current || forecast));
					return;
				}

				// combine results
				const payload: WRDataInterface = {
					current,
					forecast,
					time: moment().toDate().toString()
				};

				// dispatch success
				dispatch(dataSuccess(payload));

				// set response in cache (memory + localstorage)
				cache.current[city] = payload;
				localStorage.setItem('weatherCache', JSON.stringify(cache.current));
			});
		}
	}, [dispatch, cityName]);

	return (
		<section className="wf-result">
			{/* Loader */}
			{
				loading && (
					<div className="wf-loader"><CircularProgress /></div>
				)
			}

			{/* Current */}
			{
				!loading && data && data['current'] && data['current'] && (
					<div className="wf-current">
						<div className="wf-block1">
							{/* Location */}
							<div className="wf-location">
								<img src={PinIcon} alt="pin" />
								<h4>{data['current'].name}</h4>
							</div>

							{/* Temperature */}
							<h1>{`${Math.round(data['current']['main']['temp_min'])}°`}</h1>
						</div>

						<div className="wf-block2">
							{/* Icon */}
							{WeatherIcon(data['current'].weather[0].icon, data['current'].weather[0].description)}

							{/* Day */}
							<p>{data['current'].weather[0].description}</p>
						</div>
					</div>
				)
			}

			{/* Forecast */}
			{
				!loading && data && data['forecast'] && data['forecast']['list'] && (
					<div className="wf-forecast">
						{
							data['forecast']['list'].map((item: WRItemInterface) => (
								<div className="wf-item" key={item.dt}>
									{/* Day */}
									<h4>{convertToDay(item.dt)}</h4>

									{/* Icon */}
									{WeatherIcon(item.weather[0].icon, item.weather[0].description)}

									{/* Temperature */}
									<h6>{`${Math.round(item['main']['temp_min'])}°`}</h6>
								</div>
							))
						}
					</div>
				)
			}

			{/* Error */}
			{
				!loading && errors && errors['cod'] && (
					<div className="wf-error">
						{ errors['cod'] && (<h1>{errors['cod']}</h1>)}
						{ errors['message'] && (<p>{errors['message']}</p>)}
					</div>
				)
			}
		</section>
	);
};
export default WeatherResult;
