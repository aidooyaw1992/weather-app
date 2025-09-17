
// Weather condition interface
interface WeatherCondition {
    id: number;
    main?: string;
    description: string;
    icon?: string;
}

// Current weather interface
interface CurrentWeather {
    dt: number;
    sunrise?: number;
    sunset?: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point?: number;
    uvi?: number;
    clouds?: number;
    visibility: number;
    wind_speed: number;
    wind_deg?: number;
    wind_gust?: number;
    weather: WeatherCondition[];
    pop?: number;
    rain?: {
        '1h'?: number;
    };
    snow?: {
        '1h'?: number;
    };
}

// Temperature breakdown for daily forecast
interface DailyTemperature {
    day: number;
    min: number;
    max: number;
    night?: number;
    eve?: number;
    morn?: number;
}

// Feels like temperature breakdown for daily forecast
interface DailyFeelsLike {
    day?: number;
    night?: number;
    eve?: number;
    morn?: number;
}

// Daily weather forecast interface
interface DailyWeather {
    dt: number;
    sunrise?: number;
    sunset?: number;
    moonrise?: number;
    moonset?: number;
    moon_phase?: number;
    summary?: string;
    temp: DailyTemperature;
    feels_like?: DailyFeelsLike;
    pressure?: number;
    humidity?: number;
    dew_point?: number;
    wind_speed?: number;
    wind_deg?: number;
    wind_gust?: number;
    weather: WeatherCondition[];
    clouds?: number;
    pop: number;
    rain?: number;
    snow?: number;
    uvi?: number;
}

// Hourly weather forecast interface
interface HourlyWeather {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: WeatherCondition[];
    pop: number;
    rain?: {
        '1h': number;
    };
    snow?: {
        '1h': number;
    };
}

// Minutely precipitation forecast interface
interface MinutelyWeather {
    dt: number;
    precipitation: number;
}

// Main weather data interface
interface WeatherData {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset?: number;
    current: CurrentWeather;
    minutely?: MinutelyWeather[];
    hourly?: HourlyWeather[];
    daily: DailyWeather[];
}

type ThemeType = 'light' | 'dark' | 'system'


interface LocationCoords {
    latitude: number;
    longitude: number;
    accuracy?: number;
}

interface LocationResult {
    coords: LocationCoords;
    city?: string | undefined | null;
    country?: string | undefined | null;
    region?: string | undefined | null;
}

interface LocationError {
    code: 'PERMISSION_DENIED' | 'LOCATION_UNAVAILABLE' | 'TIMEOUT' | 'UNKNOWN';
    message: string;
}

// Export the main type
export type {
    CurrentWeather, DailyFeelsLike, DailyTemperature, DailyWeather,
    HourlyWeather, LocationCoords, LocationError, LocationResult, MinutelyWeather, ThemeType, WeatherCondition, WeatherData
};

