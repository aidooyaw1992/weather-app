import { createTheme } from '@shopify/restyle';


const palette = {
     white: '#FFFFFF',
     black: '#1A1A1A',
     gray: '#8F92A1',
     lightGrey: '#eeeeee',
     grey800: '#1f2937',
     grey700: '#374151',
     grey600: '#4b5563',
     grey500: '#5C5959',
};



const baseTheme = createTheme({
     colors: {
          appWhite: palette.white,
          appGray: palette.gray,
          appGrey800: palette.grey800,
          appBlack: palette.black,
          mainBackground: palette.white,
          secondaryBackground: palette.lightGrey,
          whiteText: palette.white,
          text: palette.black,
          textSubdued: palette.gray,
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
               fontSize: 14,
               fontFamily: 'Nunito-Regular',
          },
          header: {
               fontSize: 24,
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

export const darkTheme: Theme = {
     ...baseTheme,
     colors: {
          ...baseTheme.colors,
          mainBackground: palette.black,
          secondaryBackground: palette.grey500,
          text: palette.white
     },

}

export type Theme = typeof baseTheme;
export default baseTheme;