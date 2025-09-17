import { WeatherData } from "@/types";

const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

class WeatherService {

    async fetchMockedWeatherData(lat: number, lon: number): Promise<WeatherData> {
        const getMockWeatherData = (): WeatherData => ({
            "lat": 5.6431,
            "lon": -0.2447,
            "timezone": "Africa/Accra",
            "timezone_offset": 0,
            "current": {
                "dt": 1758135266,
                "sunrise": 1758088281,
                "sunset": 1758131986,
                "temp": 298.24,
                "feels_like": 299.1,
                "pressure": 1013,
                "humidity": 88,
                "dew_point": 296.11,
                "uvi": 0,
                "clouds": 20,
                "visibility": 10000,
                "wind_speed": 5.14,
                "wind_deg": 210,
                "weather": [
                    {
                        "id": 801,
                        "main": "Clouds",
                        "description": "few clouds",
                        "icon": "02n"
                    }
                ]
            },
            "daily": [
                {
                    "dt": 1758106800,
                    "sunrise": 1758088281,
                    "sunset": 1758131986,
                    "moonrise": 1758075060,
                    "moonset": 1758121020,
                    "moon_phase": 0.86,
                    "summary": "Expect a day of partly cloudy with rain",
                    "temp": {
                        "day": 301.09,
                        "min": 296.58,
                        "max": 301.29,
                        "night": 297.56,
                        "eve": 298.76,
                        "morn": 296.8
                    },
                    "feels_like": {
                        "day": 303.7,
                        "night": 298.33,
                        "eve": 299.52,
                        "morn": 297.62
                    },
                    "pressure": 1014,
                    "humidity": 70,
                    "dew_point": 294.82,
                    "wind_speed": 5.29,
                    "wind_deg": 194,
                    "wind_gust": 5.58,
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 89,
                    "pop": 0.8,
                    "rain": 1.42,
                    "uvi": 11.17
                },
                {
                    "dt": 1758193200,
                    "sunrise": 1758174668,
                    "sunset": 1758218354,
                    "moonrise": 1758164760,
                    "moonset": 1758210300,
                    "moon_phase": 0.89,
                    "summary": "Expect a day of partly cloudy with rain",
                    "temp": {
                        "day": 299.74,
                        "min": 296.81,
                        "max": 301.92,
                        "night": 296.98,
                        "eve": 299.56,
                        "morn": 296.98
                    },
                    "feels_like": {
                        "day": 299.74,
                        "night": 297.74,
                        "eve": 299.56,
                        "morn": 297.72
                    },
                    "pressure": 1014,
                    "humidity": 72,
                    "dew_point": 294.16,
                    "wind_speed": 5.07,
                    "wind_deg": 212,
                    "wind_gust": 7.64,
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 90,
                    "pop": 0.53,
                    "rain": 1.08,
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
                        "day": 299.14,
                        "min": 296.01,
                        "max": 300.2,
                        "night": 297.25,
                        "eve": 298.47,
                        "morn": 296.12
                    },
                    "feels_like": {
                        "day": 299.14,
                        "night": 297.99,
                        "eve": 299.17,
                        "morn": 296.9
                    },
                    "pressure": 1014,
                    "humidity": 77,
                    "dew_point": 294.7,
                    "wind_speed": 5.58,
                    "wind_deg": 231,
                    "wind_gust": 8.2,
                    "weather": [
                        {
                            "id": 501,
                            "main": "Rain",
                            "description": "moderate rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 100,
                    "pop": 0.63,
                    "rain": 3.26,
                    "uvi": 3.75
                },
                {
                    "dt": 1758366000,
                    "sunrise": 1758347442,
                    "sunset": 1758391092,
                    "moonrise": 1758343380,
                    "moonset": 1758388200,
                    "moon_phase": 0.96,
                    "summary": "You can expect partly cloudy in the morning, with rain in the afternoon",
                    "temp": {
                        "day": 301.55,
                        "min": 296.36,
                        "max": 301.55,
                        "night": 296.95,
                        "eve": 297.97,
                        "morn": 296.66
                    },
                    "feels_like": {
                        "day": 304.02,
                        "night": 297.76,
                        "eve": 298.67,
                        "morn": 297.39
                    },
                    "pressure": 1015,
                    "humidity": 66,
                    "dew_point": 294.32,
                    "wind_speed": 4.96,
                    "wind_deg": 213,
                    "wind_gust": 6.69,
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 95,
                    "pop": 0.59,
                    "rain": 3.09,
                    "uvi": 7.49
                },
                {
                    "dt": 1758452400,
                    "sunrise": 1758433830,
                    "sunset": 1758477460,
                    "moonrise": 1758432480,
                    "moonset": 1758476880,
                    "moon_phase": 0,
                    "summary": "There will be partly cloudy today",
                    "temp": {
                        "day": 298.76,
                        "min": 295.99,
                        "max": 298.76,
                        "night": 297.45,
                        "eve": 297.71,
                        "morn": 296.06
                    },
                    "feels_like": {
                        "day": 299.39,
                        "night": 298.21,
                        "eve": 298.44,
                        "morn": 296.81
                    },
                    "pressure": 1015,
                    "humidity": 77,
                    "dew_point": 294.32,
                    "wind_speed": 4.34,
                    "wind_deg": 258,
                    "wind_gust": 7.46,
                    "weather": [
                        {
                            "id": 804,
                            "main": "Clouds",
                            "description": "overcast clouds",
                            "icon": "04d"
                        }
                    ],
                    "clouds": 100,
                    "pop": 0.23,
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
                        "day": 301.34,
                        "min": 296.2,
                        "max": 301.34,
                        "night": 297.18,
                        "eve": 298.14,
                        "morn": 296.2
                    },
                    "feels_like": {
                        "day": 303.64,
                        "night": 297.88,
                        "eve": 298.81,
                        "morn": 296.88
                    },
                    "pressure": 1014,
                    "humidity": 66,
                    "dew_point": 294.08,
                    "wind_speed": 5.27,
                    "wind_deg": 228,
                    "wind_gust": 8.67,
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 85,
                    "pop": 0.55,
                    "rain": 2.44,
                    "uvi": 9.04
                },
                {
                    "dt": 1758625200,
                    "sunrise": 1758606604,
                    "sunset": 1758650198,
                    "moonrise": 1758610440,
                    "moonset": 1758654300,
                    "moon_phase": 0.05,
                    "summary": "There will be partly cloudy today",
                    "temp": {
                        "day": 302.16,
                        "min": 295.62,
                        "max": 302.16,
                        "night": 297.7,
                        "eve": 299.1,
                        "morn": 295.62
                    },
                    "feels_like": {
                        "day": 304.68,
                        "night": 298.46,
                        "eve": 299.1,
                        "morn": 296.27
                    },
                    "pressure": 1014,
                    "humidity": 63,
                    "dew_point": 293.95,
                    "wind_speed": 6.12,
                    "wind_deg": 219,
                    "wind_gust": 10,
                    "weather": [
                        {
                            "id": 803,
                            "main": "Clouds",
                            "description": "broken clouds",
                            "icon": "04d"
                        }
                    ],
                    "clouds": 58,
                    "pop": 0.2,
                    "uvi": 10
                },
                {
                    "dt": 1758711600,
                    "sunrise": 1758692992,
                    "sunset": 1758736567,
                    "moonrise": 1758699480,
                    "moonset": 1758743100,
                    "moon_phase": 0.08,
                    "summary": "Expect a day of partly cloudy with rain",
                    "temp": {
                        "day": 300.92,
                        "min": 296.98,
                        "max": 300.92,
                        "night": 297.52,
                        "eve": 298.2,
                        "morn": 296.98
                    },
                    "feels_like": {
                        "day": 303.26,
                        "night": 298.21,
                        "eve": 298.9,
                        "morn": 297.69
                    },
                    "pressure": 1015,
                    "humidity": 69,
                    "dew_point": 294.5,
                    "wind_speed": 5.86,
                    "wind_deg": 214,
                    "wind_gust": 8.06,
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "light rain",
                            "icon": "10d"
                        }
                    ],
                    "clouds": 98,
                    "pop": 0.47,
                    "rain": 1.21,
                    "uvi": 10
                }
            ]

        })
        await new Promise(resolve => setTimeout(resolve, 1000));
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

        const url = `${WEATHER_API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${key}&exclude=minutely,hourly,alerts`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
        }

        const data: WeatherData = await response.json();
        return data

    }
}

export const weatherService = new WeatherService()