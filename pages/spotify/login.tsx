import querystring from "querystring";

import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React from "react";


// TODO: Make this getRenderedProps and fetch the lists of posts from elsewhere
export const getStaticProps: GetStaticProps<{ spotify: string; }> = async () => {
    return { props: { spotify: "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: "user-read-currently-playing",
        redirect_uri: "http://localhost:3000/spotify/callback",
        show_dialog: true
    }) }};
};

const Login: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ spotify }) => {
    return (
        <>
            <a href={spotify}>login</a>
        </>
    );
};

export default Login;
