import querystring from "querystring";

import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps<{ code: string, auth: string }> = async (context) => {
    const code = context.query.code;

    if (typeof code !== "string") {
        throw new Error(`Invalid code: ${code}`);
    }

    return {
        props: {
            code,
            auth: btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)
        }
    };
};

const Callback: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ auth, code }) => {
    const [result, setResult] = useState();

    useEffect(() => {
        axios.post("https://accounts.spotify.com/api/token", querystring.stringify({
            "grant_type": "authorization_code",
            "redirect_uri": "http://localhost:3000/spotify/callback",
            "code": code
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${auth}`
            }
        }).then((response) => {
            setResult({ accessToken: response.data["access_token"], refreshToken: response.data["refresh_token"] });
        });
    }, [code]);

    return <div><div>access: {result?.accessToken}</div><div>refresh: {result?.refreshToken}</div></div>;
};

export default Callback;