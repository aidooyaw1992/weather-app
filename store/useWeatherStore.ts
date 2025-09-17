import { WeatherData } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type WeatherState = {
    weatherData: WeatherData | null;
    location: Location | null;
    isLoading: boolean;
    error: string | null;
    lastUpdated: number | null;
}
type WeatherAction = {
    // Actions
    setLocation: (location: Location) => void;
    fetchWeatherData: (lat: number, lon: number, apiKey: string) => Promise<void>;
    clearError: () => void;
    refreshWeatherData: (apiKey: string) => Promise<void>;

    // Computed
    isDataStale: () => boolean;
}

const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const STALE_TIME = 15 * 60 * 1000; //15mins

const initialState: WeatherState = {
    weatherData: null,
    location: null,
    isLoading: false,
    error: null,
    lastUpdated: null,
};

export const useWeatherStore = create<WeatherState & WeatherAction>()(
    persist(
        (set, get) => ({

            ...initialState,
            setLocation: (location: Location) => { set({ location }); },

            // Fetch weather data from API
            fetchWeatherData: async (lat: number, lon: number, apiKey?: string) => {
                set({ isLoading: true, error: null });

                try {
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

                    set({
                        weatherData: data,
                        isLoading: false,
                        error: null,
                        lastUpdated: Date.now(),
                    });

                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';

                    set({
                        isLoading: false,
                        error: errorMessage,
                    });

                    throw error; // Re-throw for component handling if needed
                }
            },

            // Refresh weather data using stored location
            refreshWeatherData: async (apiKey?: string) => {
                const { location } = get();

                if (!location) {
                    set({ error: 'No location available for refresh' });
                    return;
                }

                await get().fetchWeatherData(location.latitude, location.longitude, apiKey);
            },

            // Clear error state
            clearError: () => {
                set({ error: null });
            },

            // Check if data is stale
            isDataStale: () => {
                const { lastUpdated } = get();
                if (!lastUpdated) return true;
                return Date.now() - lastUpdated > STALE_TIME;
            },
        }),

        {
            name: 'weather-storage', // Storage key
            storage: createJSONStorage(() => AsyncStorage),

            partialize: (state) => ({
                weatherData: state.weatherData,
                location: state.location,
                lastUpdated: state.lastUpdated,
            }),

            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.isLoading = false;
                    state.error = null;
                }
            },
        }
    )
)