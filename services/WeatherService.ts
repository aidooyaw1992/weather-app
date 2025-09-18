import { WeatherData } from "@/types";

const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class WeatherService {

    async fetchMockedWeatherData(lat: number, lon: number): Promise<WeatherData> {
        const getMockWeatherData = (): WeatherData => ({
            "lat": 5.6431,
            "lon": -0.2447,
            "timezone": "Africa/Accra",
            "timezone_offset": 0,
            "current": {
                "dt": 1758195465,
                "sunrise": 1758174668,
                "sunset": 1758218354,
                "temp": 27.09,
                "feels_like": 29.74,
                "pressure": 1013,
                "humidity": 78,
                "dew_point": 22.92,
                "uvi": 9.17,
                "clouds": 75,
                "visibility": 10000,
                "wind_speed": 5.14,
                "wind_deg": 210,
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04d"
                    }
                ]
            },
            "daily": [
                {
                    "dt": 1758193200,
                    "sunrise": 1758174668,
                    "sunset": 1758218354,
                    "moonrise": 1758164760,
                    "moonset": 1758210300,
                    "moon_phase": 0.89,
                    "summary": "Expect a day of partly cloudy with rain",
                    "temp": {
                        "day": 27.36,
                        "min": 23.17,
                        "max": 27.56,
                        "night": 24.28,
                        "eve": 27.1,
                        "morn": 23.26
                    },
                    "feels_like": {
                        "day": 30,
                        "night": 24.98,
                        "eve": 29.03,
                        "morn": 24.04
                    },
                    "pressure": 1013,
                    "humidity": 75,
                    "dew_point": 22.54,
                    "wind_speed": 5.04,
                    "wind_deg": 216,
                    "wind_gust": 6.58,
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 78,
                    "pop": 0.67,
                    "rain": 1.92,
                    "uvi": 10.61
                },
                {
                    "dt": 1758279600,
                    "sunrise": 1758261055,
                    "sunset": 1758304723,
                    "moonrise": 1758254160,
                    "moonset": 1758299340,
                    "moon_phase": 0.92,
                    "summary": "Expect a day of partly cloudy with rain",
                    "temp": {
                        "day": 27.43,
                        "min": 23.13,
                        "max": 28.33,
                        "night": 23.89,
                        "eve": 26.54,
                        "morn": 23.26
                    },
                    "feels_like": {
                        "day": 29.6,
                        "night": 24.66,
                        "eve": 26.54,
                        "morn": 23.97
                    },
                    "pressure": 1015,
                    "humidity": 70,
                    "dew_point": 21.17,
                    "wind_speed": 5.74,
                    "wind_deg": 223,
                    "wind_gust": 8.36,
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 98,
                    "pop": 0.5,
                    "rain": 2.38,
                    "uvi": 3.75
                },
                {
                    "dt": 1758366000,
                    "sunrise": 1758347442,
                    "sunset": 1758391092,
                    "moonrise": 1758343380,
                    "moonset": 1758388200,
                    "moon_phase": 0.96,
                    "summary": "There will be partly cloudy today",
                    "temp": {
                        "day": 26.96,
                        "min": 23.53,
                        "max": 28.71,
                        "night": 24.17,
                        "eve": 26.57,
                        "morn": 23.66
                    },
                    "feels_like": {
                        "day": 28.87,
                        "night": 24.89,
                        "eve": 26.57,
                        "morn": 24.33
                    },
                    "pressure": 1015,
                    "humidity": 71,
                    "dew_point": 20.99,
                    "wind_speed": 5.83,
                    "wind_deg": 217,
                    "wind_gust": 7.14,
                    "weather": [
                        {
                            "id": 804,
                            "main": "Clouds",
                            "description": "overcast clouds",
                            "icon": "04d"
                        }
                    ],
                    "clouds": 96,
                    "pop": 0.42,
                    "uvi": 7.49
                },
                {
                    "dt": 1758452400,
                    "sunrise": 1758433830,
                    "sunset": 1758477460,
                    "moonrise": 1758432480,
                    "moonset": 1758476880,
                    "moon_phase": 0,
                    "summary": "Expect a day of partly cloudy with rain",
                    "temp": {
                        "day": 28.06,
                        "min": 22.82,
                        "max": 28.66,
                        "night": 25.01,
                        "eve": 25.81,
                        "morn": 22.82
                    },
                    "feels_like": {
                        "day": 30.13,
                        "night": 25.68,
                        "eve": 26.48,
                        "morn": 23.48
                    },
                    "pressure": 1014,
                    "humidity": 65,
                    "dew_point": 20.59,
                    "wind_speed": 4.37,
                    "wind_deg": 205,
                    "wind_gust": 7.15,
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 94,
                    "pop": 0.4,
                    "rain": 0.66,
                    "uvi": 8.1
                },
                {
                    "dt": 1758538800,
                    "sunrise": 1758520217,
                    "sunset": 1758563829,
                    "moonrise": 1758521460,
                    "moonset": 1758565560,
                    "moon_phase": 0.02,
                    "summary": "Expect a day of partly cloudy with rain",
                    "temp": {
                        "day": 29.03,
                        "min": 23.39,
                        "max": 29.03,
                        "night": 24.31,
                        "eve": 26.18,
                        "morn": 23.39
                    },
                    "feels_like": {
                        "day": 31.4,
                        "night": 25.04,
                        "eve": 26.18,
                        "morn": 24.06
                    },
                    "pressure": 1014,
                    "humidity": 62,
                    "dew_point": 20.71,
                    "wind_speed": 5.64,
                    "wind_deg": 231,
                    "wind_gust": 9.36,
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 87,
                    "pop": 0.59,
                    "rain": 2.26,
                    "uvi": 9.04
                },
                {
                    "dt": 1758625200,
                    "sunrise": 1758606604,
                    "sunset": 1758650198,
                    "moonrise": 1758610440,
                    "moonset": 1758654300,
                    "moon_phase": 0.05,
                    "summary": "You can expect partly cloudy in the morning, with rain in the afternoon",
                    "temp": {
                        "day": 28.5,
                        "min": 23.14,
                        "max": 28.5,
                        "night": 24.12,
                        "eve": 25.62,
                        "morn": 23.14
                    },
                    "feels_like": {
                        "day": 30.76,
                        "night": 24.89,
                        "eve": 26.33,
                        "morn": 23.73
                    },
                    "pressure": 1014,
                    "humidity": 64,
                    "dew_point": 20.63,
                    "wind_speed": 5.1,
                    "wind_deg": 237,
                    "wind_gust": 8.88,
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 91,
                    "pop": 0.83,
                    "rain": 3.05,
                    "uvi": 10
                },
                {
                    "dt": 1758711600,
                    "sunrise": 1758692992,
                    "sunset": 1758736567,
                    "moonrise": 1758699480,
                    "moonset": 1758743100,
                    "moon_phase": 0.08,
                    "summary": "The day will start with partly cloudy through the late morning hours, transitioning to rain",
                    "temp": {
                        "day": 27.93,
                        "min": 23.23,
                        "max": 27.93,
                        "night": 24.09,
                        "eve": 24.49,
                        "morn": 23.23
                    },
                    "feels_like": {
                        "day": 30.15,
                        "night": 24.83,
                        "eve": 25.27,
                        "morn": 23.91
                    },
                    "pressure": 1015,
                    "humidity": 67,
                    "dew_point": 21.02,
                    "wind_speed": 4.95,
                    "wind_deg": 248,
                    "wind_gust": 9.24,
                    "weather": [
                        {
                            "id": 501,
                            "main": "Rain",
                            "description": "moderate rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 99,
                    "pop": 0.92,
                    "rain": 4.06,
                    "uvi": 10
                },
                {
                    "dt": 1758798000,
                    "sunrise": 1758779379,
                    "sunset": 1758822936,
                    "moonrise": 1758788580,
                    "moonset": 1758832020,
                    "moon_phase": 0.11,
                    "summary": "Expect a day of partly cloudy with rain",
                    "temp": {
                        "day": 28.99,
                        "min": 22.87,
                        "max": 28.99,
                        "night": 24.62,
                        "eve": 25.66,
                        "morn": 22.92
                    },
                    "feels_like": {
                        "day": 31.33,
                        "night": 25.33,
                        "eve": 26.32,
                        "morn": 23.62
                    },
                    "pressure": 1015,
                    "humidity": 62,
                    "dew_point": 20.75,
                    "wind_speed": 5.5,
                    "wind_deg": 205,
                    "wind_gust": 7.38,
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 89,
                    "pop": 0.47,
                    "rain": 0.29,
                    "uvi": 10
                }
            ]
        })


        await delay(1000)
        // throw new Error('something went wrong')


        const data = getMockWeatherData();
        data.lat = lat;
        data.lon = lon;
        return data;
    }

    async fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
        const key = process.env.EXPO_PUBLIC_WEATHER_API_KEY

        if (!key) {
            throw new Error('Weather API key not found. Please check your environment variables.')
        }

        const url = `${WEATHER_API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${key}&units=metric&exclude=minutely,hourly,alerts`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
        }
        console.log('retrieved data');

        const data: WeatherData = await response.json();
        return data

    }
}

export const weatherService = new WeatherService()