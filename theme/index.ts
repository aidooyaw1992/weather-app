import { createTheme } from '@shopify/restyle';
import { PixelRatio, Platform } from 'react-native';


const palette = {
     white: '#FFFFFF',
     black: '#1A1A1A',
     gray: '#8F92A1',
     lightGrey: '#eeeeee'
};

const getDefaultFontSize = () => {
  if (Platform.OS === 'ios') {
    return PixelRatio.getFontScale() * 17;
  }
  return PixelRatio.getFontScale() * 14;
};

const theme = createTheme({
     colors: {
          mainBackground: palette.white,
          secondaryBackground: palette.lightGrey,
          whiteText: palette.white,
          text: palette.black
     },
     spacing: {
          xxs: 2,
          xs: 4,
          s: 8,
          m: 16,
          l: 24,
          xl: 32,
          xxl: 40,
     },
     borderRadii: {
          xs: 5,
          s: 10,
          m: 15,
          l: 20,
          xl: 25,
          xxl: 30,
          round: 99999,
     },
     textVariants: {
          defaults: {
               color: 'text',
               fontSize: getDefaultFontSize(),
               fontFamily: 'Nunito-Regular',
          },
          header: {
               fontWeight: 'bold',
               fontSize: 24,
               lineHeight: 32,
               fontFamily: 'Nunito-Bold',
          },
          subheader: {
               fontWeight: '600',
               fontSize: 20,
               lineHeight: 28,
               fontFamily: 'Nunito-SemiBold',
          },
     }
})


export type Theme = typeof theme;
export default theme;