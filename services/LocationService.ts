
import { LocationError, LocationResult } from '@/types';
import * as Location from 'expo-location';

class LocationService {

    async hasLocationPermission(): Promise<boolean> {
        try {
            const { status } = await Location.getForegroundPermissionsAsync();
            return status === 'granted';
        } catch (e){
            console.log('wee',e);
            
            return false;
        }
    }

    async requestPermissions(): Promise<{ granted: boolean; error?: string }> {
        try {
            // Check if location services are enabled
            const enabled = await Location.hasServicesEnabledAsync();
            if (!enabled) {
                return {
                    granted: false,
                    error: 'Location services are disabled. Please enable them in your device settings.'
                };
            }

            // Request foreground permissions
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                return {
                    granted: false,
                    error: 'Location permission denied. Please allow location access to get weather for your area.'
                };
            }

            return { granted: true };
        } catch (error) {
            return {
                granted: false,
                error: 'Failed to request location permissions'
            };
        }
    }

    async getCurrentLocation(): Promise<LocationResult | LocationError> {
        try {
            // First check/request permissions
            const permissionResult = await this.requestPermissions();
            if (!permissionResult.granted) {
                return {
                    code: 'PERMISSION_DENIED',
                    message: permissionResult.error || 'Permission denied'
                };
            }

            // Get current position with timeout
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
                timeInterval: 10000, // 10 seconds
                distanceInterval: 100, // 100 meters
            });

            const result: LocationResult = {
                coords: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    accuracy: location.coords.accuracy || undefined,
                }
            };

            // Optionally get address info (reverse geocoding)
            try {
                const addresses = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                if (addresses && addresses.length > 0) {
                    const address = addresses[0];
                    result.city = address.city || address.subregion;
                    result.region = address.region;
                    result.country = address.country;
                }
            } catch (geocodeError) {
                // Geocoding failed, but we still have coordinates
                console.warn('Reverse geocoding failed:', geocodeError);
            }

            return result;
        } catch (error) {
            console.error('Location error:', error);
            return {
                code: 'LOCATION_UNAVAILABLE',
                message: 'Unable to get your current location. Please try again.'
            };
        }
    }
    async getLastKnownLocation(): Promise<LocationResult | LocationError> {
        try {
            const hasPermission = await this.hasLocationPermission();
            if (!hasPermission) {
                return {
                    code: 'PERMISSION_DENIED',
                    message: 'Location permission not granted'
                };
            }

            const location = await Location.getLastKnownPositionAsync({
                requiredAccuracy: Location.Accuracy.Balanced,
            });

            if (!location) {
                // Fallback to current location
                return this.getCurrentLocation();
            }

            return {
                coords: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    accuracy: location.coords.accuracy || undefined,
                }
            };
        } catch (error) {
            return {
                code: 'LOCATION_UNAVAILABLE',
                message: 'Unable to get location'
            };
        }
    }

}


export const locationService = new LocationService();