// app
import { convertToDay, roundToHours } from './Helpers';
import moment from 'moment';

test('[Function] validation of rounding date to the nearest 3 hour', () => {
	// round to 3 hours
	const roundedHrs = roundToHours(moment().toDate(), 3);
	const hour = moment(roundedHrs).format('HH');
	const isMultipleOfThree = (Number(hour) % 3 === 0);

	expect(isMultipleOfThree).toBeTruthy();
});

test('[Function] validation of converting unix time to a day in aplhabet', () => {
	// dt, day
	const dt = 1600711200;
	const day = convertToDay(dt);

	expect(day).toBe('Mon');
});
