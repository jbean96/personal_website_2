import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { NextPageContext } from "next";
import CssBaseline from "@mui/material/CssBaseline";

import { DarkModeContextProvider } from "components/DarkMode/DarkModeContext";
import { DARK_MODE_COOKIE_KEY } from "components/DarkMode/darkMode";
import { ThemeProvider } from "components/Theme";
import { CodeStyleContextProvider, WRAP_LONG_LINES_COOKIE_KEY } from "components/posts/Code";

function App({
    Component,
    pageProps,
    // @ts-ignore
    props: { initialIsDarkModeEnabled, initialWrapLongLines },
}: AppProps<AppInitialProps>) {
    return (
        <DarkModeContextProvider initialIsDarkModeEnabled={initialIsDarkModeEnabled}>
            <CodeStyleContextProvider initialWrapLongLines={initialWrapLongLines}>
                <ThemeProvider>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CodeStyleContextProvider>
        </DarkModeContextProvider>
    );
}

interface AppInitialProps {
    props: {
        initialIsDarkModeEnabled: boolean;
        initialWrapLongLines: boolean;
    };
}

App.getInitialProps = async ({ ctx: { req } }: { ctx: NextPageContext }): Promise<AppInitialProps> => {
    return {
        props: {
            // @ts-ignore
            initialIsDarkModeEnabled: req?.cookies[DARK_MODE_COOKIE_KEY] === "true",
            // @ts-ignore
            initialWrapLongLines: req?.cookies[WRAP_LONG_LINES_COOKIE_KEY] === "true",
        },
    };
};

export default App;
