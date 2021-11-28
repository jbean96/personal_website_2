import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Container } from "@mui/material";
import { NextPageContext } from "next";
import CssBaseline from "@mui/material/CssBaseline";

import { DarkModeContextProvider } from "components/DarkMode/DarkModeContext";
import { DARK_MODE_COOKIE_KEY } from "components/DarkMode/darkMode";
import { ThemeProvider } from "components/Theme";

function App({ Component, pageProps, props: { initialIsDarkModeEnabled } }: AppProps<AppInitialProps>) {
    return (
        <DarkModeContextProvider initialIsDarkModeEnabled={initialIsDarkModeEnabled}>
            <ThemeProvider>
                <CssBaseline />
                <Container
                    maxWidth="md"
                    style={{ minWidth: "440px" }}
                >
                    <Component {...pageProps} />
                </Container>
            </ThemeProvider>
        </DarkModeContextProvider>
    );
}

interface AppInitialProps {
  props: {
    initialIsDarkModeEnabled: boolean;
  };
}

App.getInitialProps = async ({ ctx: { req } }: { ctx: NextPageContext}): Promise<AppInitialProps>  => {
    return {
        props: {
            initialIsDarkModeEnabled: req?.cookies[DARK_MODE_COOKIE_KEY] === "true"
        }
    };
};

export default App;
