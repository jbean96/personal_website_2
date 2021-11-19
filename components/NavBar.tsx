import { AppBar, Slide, styled, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import React, { FC } from "react";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const NavBar: FC = () => {
    const scrollTrigger = useScrollTrigger();

    return (
        <>
            <Slide appear={false} direction="down" in={!scrollTrigger}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h4" sx={{ display: "inline" }}>Josh Bean</Typography>
                    </Toolbar>
                </AppBar>
            </Slide>
            <Offset />
        </>
    )
}