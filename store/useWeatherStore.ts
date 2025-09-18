import { weatherService } from '@/services/WeatherService';
import { LocationResult, WeatherData } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type WeatherState = {
    weatherData: WeatherData | null;
    location: LocationResult | null;
    isLoading: boolean;
    isLocationLoading: boolean;
    hasLocationPermission: boolean;
    error: string | null;
    lastUpdated: number | null;
}
type WeatherAction = {
    // Actions
    setLocation: (location: LocationResult) => void;
    fetchWeatherData: (lat: number, lon: number) => Promise<void>;
    clearError: () => void;
    refreshWeatherData: () => Promise<void>;

    // Computed
    isDataStale: () => boolean;
}

const STALE_TIME = 15 * 60 * 1000; //15mins

const initialState: WeatherState = {
    weatherData: null,
    location: null,
    isLoading: false,
    isLocationLoading: false,
    hasLocationPermission: false,
    error: null,
    lastUpdated: null,
};


export const useWeatherStore = create<WeatherState & WeatherAction>()(
    persist(
        (set, get) => ({

            ...initialState,
            setLocation: (location: LocationResult) => { set({ location }); },

            // Fetch weather data from API
            fetchWeatherData: async (lat: number, lon: number) => {

                set({ isLoading: true, error: null });

                try {

                    let data = await weatherService.fetchMockedWeatherData(lat, lon)
                    // let data = await weatherService.fetchWeatherData(lat, lon)

                    set({
                        weatherData: data,
                        isLoading: false,
                        error: null,
                        lastUpdated: Date.now(),
                    });

                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';

                    set({ isLoading: false, error: errorMessage, });

                    throw error; // Re-throw for component handling if needed
                }
            },

            // Refresh weather data using stored location
            refreshWeatherData: async () => {
                const { location } = get();

                if (!location) {
                    set({ error: 'No location available for refresh' });
                    return;
                }

                await get().fetchWeatherData(location.coords.latitude, location.coords.longitude);
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