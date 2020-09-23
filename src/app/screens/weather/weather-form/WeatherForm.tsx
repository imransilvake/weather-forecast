// react
import React, { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// app
import './WeatherForm.scss';
import SearchIcon from '../../../../assets/svg/search.svg';
import { formInputUpdate } from '../../../slices/weatherForm';
import { RootState } from '../../../slices';

const WeatherForm: FC = () => {
	// hooks
	const dispatch = useDispatch();
	const { cityName } = useSelector((state: RootState) => state.weatherForm);
	const [state, setState] = useState(cityName);

	/**
	 * handle change event
	 * @param event
	 */
	const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
		// destruct
		const { value } = event.target;

		// update hook: setState
		setState(value);
	};

	/**
	 * handle submit event
	 * @param event
	 */
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		// prevent default
		event.preventDefault();

		// dispatch: update input
		dispatch(formInputUpdate(state));
	};

	return (
		<form onSubmit={handleSubmit} className="wf-form">
			{/* Search */}
			<img className="wf-search" src={SearchIcon} alt="search" />

			{/* Input */}
			<div className="wf-input-wrapper">
				<TextField
					id="text"
					type="text"
					name="text"
					value={state}
					onChange={handleChange}
					onBlur={handleChange}
					InputProps={{
						className: 'wf-input'
					}}
					fullWidth />
			</div>

			{/* Search */}
			<Button
				className="wf-button"
				type="submit"
				variant="contained"
				color="secondary">
				Search
			</Button>
		</form>
	);
};
export default WeatherForm;
