import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { blueGrey, indigo } from "@mui/material/colors";
import { Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

import { NavBar } from "components/NavBar";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500]
    },
    secondary: {
      main: blueGrey[300]
    }
  },
  typography: {
    allVariants: {
      lineHeight: "1.5em",
      letterSpacing: "0.05em"
    },
    h1: {
      fontSize: 48,
      fontWeight: 500
    },
    h2: {
      fontSize: 36
    },
    h3: {
      fontSize: 28
    },
    h4: {
      fontSize: 24
    },
    h5: {
      fontSize: 22
    },
    h6: {
      fontSize: 20
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsThemeProvider theme={theme}>
        <NavBar />
        <Container maxWidth="lg" disableGutters style={{ minWidth: "440px" }}>
          <Component {...pageProps} />
        </Container>
      </StyledComponentsThemeProvider>
    </ThemeProvider>
  );
}
export default MyApp;
