/* eslint-disable no-unused-vars */
import { Theme } from "@mui/material";
import "styled-components";

declare module "styled-components" {
    // Extends the MUI theme so that styled-components theme object gets the correct
    // typing.
    interface DefaultTheme extends Theme {}
}