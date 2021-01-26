import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import dark from '../Assets/Styles/Themes/dark';
import light from '../Assets/Styles/Themes/light';
import GlobalStyle from '../Assets/Styles/global';
import usePeristedState from '../utils/usePersistedState';
import Header from '../Components/Header';

const Theme: React.FC = () => {
  const [theme, setTheme] = usePeristedState<DefaultTheme>('theme', light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header toggleTheme={toggleTheme} />
      </ThemeProvider>
    </div>
  );
};

export default Theme;
