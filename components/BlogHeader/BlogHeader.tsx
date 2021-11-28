import { Switch, Typography } from "@mui/material";
import React, { VFC } from "react";
import Image from "next/image";
import styled from "styled-components";

import { DarkModeSwitch } from "components/DarkMode";

const BlogHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(3)};
    gap: ${({ theme }) => theme.spacing(3)};
`;

const DescriptionWrapper = styled.div`
    flex: 1 1 250px;
    max-width: 500px;
`;

const HeaderImageWrapper = styled.div`
    flex: 1 0.5 70px;
    max-width: 80px;
`;

const HeaderImage = styled(Image)`
    border-radius: 100%;
`;

const SwitchWrapper = styled.div`
    margin-left: auto;
`;

export const BlogHeader: VFC = () => {
    return (
        <BlogHeaderWrapper>
            <HeaderImageWrapper>
                <HeaderImage
                    alt="Picture of Josh"
                    height={80}
                    src="/BlogHeader/josh.jpg"
                    width={80}
                />
            </HeaderImageWrapper>
            <DescriptionWrapper>
                <Typography variant="h2">Josh Bean</Typography>
                <Typography variant="subtitle1">
                    A blog about React, TypeScript and other things that I like to experiment and build with.
                </Typography>
            </DescriptionWrapper>
            <SwitchWrapper>
                <DarkModeSwitch />
            </SwitchWrapper>
        </BlogHeaderWrapper>
    );
};