// Weather: Result Interface
export interface WeatherResultInterface {
	loading: boolean;
	data: WRDataInterface | null;
	errors: {
		cod: string;
		message: string;
	} | null;
};

// Weather: Result Data Interface
export interface WRDataInterface {
	current: WRItemInterface;
	forecast: WRDataForecastInterface;
	time?: string;
};

// Weather: Forecast Interface
export interface WRDataForecastInterface {
	cod: string;
	cnt: number;
	list: WRItemInterface[];
	city: {
		name: string;
		country: string;
	}
}

// Weather: Forecast List Interface
export interface WRItemInterface {
	cod?: number;
	name: string;
	dt: number;
	dt_txt: string;
	main: {
		temp: number;
		temp_min: number;
		temp_max: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
}
