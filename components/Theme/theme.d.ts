/* eslint-disable no-unused-vars */
import React from "react";

declare module "@mui/material/styles" {
    interface PaletteOptions {
        code: string;
    }

    interface Palette {
        code: string;
    }

    interface TypographyVariants {
        blogTitle: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        blogTitle?: React.CSSProperties;
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        blogTitle: true;
    }
}