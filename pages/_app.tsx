import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import { Container, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { NavBar } from 'components/NavBar';

const theme = createTheme({
  typography: {
     h1: {
      fontSize: 48,
      fontWeight: 500,
    },
    h2: {
      fontSize: 36,
    },
    h3: {
      fontSize: 28,
    },
    h4: {
      fontSize: 24,
    },
    h5: {
      fontSize: 22,
    },
    h6: {
      fontSize: 20,
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container maxWidth="lg" disableGutters style={{ minWidth: "440px" }}>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}
export default MyApp
