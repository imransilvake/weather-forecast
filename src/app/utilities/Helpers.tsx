// app
import moment from 'moment';

/**
 * round to hours based on the interval
 * @param date
 * @param interval
 */
const roundToHours = (date: Date, interval: number) => {
	// three hours in milliseconds
	const g = interval * 60 * 60 * 1000;

	// get local offset
	const o = date.getTimezoneOffset() * -6e4;

	// round to nearest 3 hrs
	const x = Math.round((+date + o) / g);

	// return date
	return moment(x * g - o).toDate();
};

/**
 * get current day
 * @param dt
 * @param isNum
 */
const convertToDay = (dt: number, isNum?: boolean) => {
	return moment.unix(dt).utc().format(isNum ? 'DD' : 'ddd');
};

export {
	roundToHours,
	convertToDay
};
