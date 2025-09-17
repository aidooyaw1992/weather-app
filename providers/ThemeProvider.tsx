// providers/ThemeProvider.tsx
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

import { useAppThemeStore } from '@/store/useAppThemeStore';
import baseTheme, { darkTheme } from '@/theme'; // Your theme objects

interface ThemeContextType {
  colorScheme: ColorSchemeName;
  toggleTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, setTheme } = useAppThemeStore();
  const [colorScheme, setColorScheme] = React.useState<ColorSchemeName>(
    theme === 'system' ? Appearance.getColorScheme() : theme
  );

  useEffect(() => {
    if (theme === 'system') {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setColorScheme(colorScheme);
      });
      setColorScheme(Appearance.getColorScheme());
      return () => subscription?.remove();
    } else {
      setColorScheme(theme as ColorSchemeName);
    }
  }, [theme]);

  const toggleTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  const currentTheme = colorScheme === 'dark' ? darkTheme : baseTheme;

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
      <RestyleThemeProvider theme={currentTheme}>
        {children}
      </RestyleThemeProvider>
    </ThemeContext.Provider>
  );
};