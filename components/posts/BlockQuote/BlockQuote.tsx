import { alpha } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const BlockQuoteWrapper = styled.div`
    background-color: ${({ theme }) => alpha(theme.palette.secondary.light, 0.2) };
    border-left: ${({ theme }) => theme.spacing(1)} solid ${({ theme }) => theme.palette.secondary.dark};
    padding: ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.spacing(0.5)};
    margin: ${({ theme }) => theme.spacing(0, 2, 2, 2)};\

    *:last-child {
        margin-bottom: 0;
    }

    *:first-child {
        margin-top: 0;
    }
`;

export const BlockQuote = ({ children }: PropsWithChildren<{}>) => {
    return <BlockQuoteWrapper>{children}</BlockQuoteWrapper>;
};