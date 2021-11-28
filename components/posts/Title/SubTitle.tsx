import { Typography } from "@mui/material";
import React, { FC } from "react";
import styled from "styled-components";

import { DarkModeSwitch } from "components/DarkMode";

const SubTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const SubTitle: FC = ({ children }) => {
    return (
        <SubTitleWrapper>
            <Typography variant="subtitle2">{children}</Typography>
            <DarkModeSwitch />
        </SubTitleWrapper>
    );
};