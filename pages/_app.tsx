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
      lineHeight: "1.7em",
      letterSpacing: "0.06em"
    },
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      letterSpacing: "0.03em"
    },
    h2: {
      fontSize: "2.2rem",
      fontWeight: 700,
      letterSpacing: "0.04em"
    },
    h3: {
      fontSize: "1.8rem"
    },
    h4: {
      fontSize: "1.6rem"
    },
    h5: {
      fontSize: "1.3rem"
    },
    h6: {
      fontSize: "1.2rem"
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
