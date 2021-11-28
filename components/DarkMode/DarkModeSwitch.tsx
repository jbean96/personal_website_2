import { Switch } from "@mui/material";
import React, { useContext, VFC } from "react";

import { DarkModeContext } from "./DarkModeContext";

export const DarkModeSwitch: VFC = () => {
    const { isDarkModeEnabled, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <Switch checked={isDarkModeEnabled} onChange={toggleDarkMode} />
    );
};