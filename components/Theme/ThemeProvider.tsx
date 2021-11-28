import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { FC, useContext, useMemo } from "react";
import { alpha, createTheme, PaletteMode, PaletteOptions, ThemeOptions } from "@mui/material";
import { blueGrey, deepOrange, lightGreen, orange, yellow } from "@mui/material/colors";
import _merge from "lodash/merge";
import { TypographyOptions } from "@mui/material/styles/createTypography";

import { DarkModeContext } from "components/DarkMode";

const typographyOptions: TypographyOptions = {
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
};

const paletteOptions = (mode: PaletteMode): PaletteOptions => ({
    mode,
    ...(mode === "light" ? {
        background: {
            default: blueGrey[50],
            paper: blueGrey[50]
        },
        code: orange[200],
        secondary: {
            main: orange[200]
        }
    } : {
        background: {
            default: blueGrey[900],
            paper: alpha(blueGrey[800], 0.2)
        },
        code: alpha(deepOrange[600], 0.5)
    })
});

const getThemeTokens = (mode: PaletteMode): ThemeOptions => _merge({}, {
    typography: typographyOptions,
    palette: paletteOptions(mode)
});

export const ThemeProvider: FC = ({ children }) => {
    const { isDarkModeEnabled } = useContext(DarkModeContext);

    const theme = useMemo(() => {
        const theme = createTheme(getThemeTokens(isDarkModeEnabled ? "dark" : "light"));
        theme.typography.blogTitle = {
            ...theme.typography.h1,
            [theme.breakpoints.down("md")]: {
                fontSize: theme.typography.h2.fontSize
            }
        };
        return theme;
    }, [isDarkModeEnabled]);

    return (
        <EmotionThemeProvider theme={theme}>
            <StyledComponentsThemeProvider theme={theme}>
                {children}
            </StyledComponentsThemeProvider>
        </EmotionThemeProvider>
    );
};