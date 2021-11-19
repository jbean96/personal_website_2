import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import React from "react";
import { Button, Typography, useTheme } from "@mui/material";
import styled from "styled-components";

import { Mountain } from "components/background/Mountain";

const StyledBackground = styled.div`
  & {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    .mountain1 {
      transform: scaleY(5) scaleX(4);
      position: absolute;
      bottom: 0;
      left: -250px;
      transform-origin: bottom left;
    }

    .mountain2 {
      transform: scale(3);
      position: absolute;
      bottom: 0;
      left: 10px;
      transform-origin: bottom left;
    }
  }
`;

const StyledMain = styled.main`
  & {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 500px;
  }
`;

const Home: NextPage = () => {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Josh Bean</title>
        <meta name="description" content="Josh Bean's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledMain>
        <Typography variant="h1">Hey I&#39;m Josh</Typography>
        <Link href="/blog" passHref><Button>Blog</Button></Link>
        <StyledBackground>
          <Mountain className="mountain1" primary={theme.palette.primary.main} secondary={theme.palette.primary.light} />
          <Mountain className="mountain2" primary={theme.palette.secondary.main} secondary={theme.palette.secondary.light} />
        </StyledBackground>
      </StyledMain>
    </>
  );
};

export default Home;
