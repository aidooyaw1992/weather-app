import { DailyWeather } from '@/types';
import { Image, StyleSheet } from 'react-native';
import { Box } from "./Box";
import { StyledText } from './StyledText';

interface Props {
    listItem: DailyWeather
}

const WeatherListItem: React.FC<Props> = ({ listItem }) => {

    const tempCelsius = Math.round(listItem.temp.max);

    const tempMinCelsius = Math.round(listItem.temp.min);

    const date = new Date(listItem.dt * 1000);

    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

    const description = listItem.weather[0].description

    const imageUrl = `https://openweathermap.org/img/wn/${listItem.weather[0].icon}.png`

    return (
        <Box flexDirection='row' alignItems='center'  justifyContent='space-between' gap='m'>
            <StyledText minWidth={40}>{dayName}</StyledText>
            <Box flexDirection='row' gap='s' minWidth={48}>
                <StyledText fontSize={16} >{tempCelsius}°</StyledText>
                <StyledText color='textSubdued' fontSize={14} >{tempMinCelsius}°</StyledText>
            </Box>
            <Box width={50} height={50} alignItems='center' justifyContent='center'>
                <Image style={styles.weatherIcon} source={{ uri: imageUrl }} />
            </Box>
            <StyledText flex={1} marginLeft='m' textTransform="capitalize" numberOfLines={1} fontSize={14}>{description}</StyledText>
        </Box>
    );
}



export default WeatherListItem


const styles = StyleSheet.create({
    weatherIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    }
})