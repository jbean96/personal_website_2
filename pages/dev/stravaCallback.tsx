import styles from 'styles/dev/Strava.module.css';

import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { StravaAuthToken, StravaAuthTokenRequest } from "types/strava";
import { getEnvVariables } from "utils/env";

export const getServerSideProps: GetServerSideProps<{ response: StravaAuthToken }> = async ({ query }) => {
    const code = query.code;
    if (typeof code !== 'string') {
        return {
            redirect: {
                destination: '/dev/strava',
                permanent: false
            },
        };
    }

    const envVariables = getEnvVariables();

    try {
        const response = await axios.post<StravaAuthTokenRequest, AxiosResponse<StravaAuthToken>>('https://www.strava.com/oauth/token', {
            client_id: envVariables.strava.clientId,
            client_secret: envVariables.strava.clientSecret,
            code,
            grant_type: 'authorization_code',
        }).then(response => response.data);

        return {
            props: { response },
        };
    } catch (error) {
        console.log(error);
    }

    return {
        redirect: {
            destination: '/dev/strava',
            permanent: false
        }
    };
}

const StravaAuthCallback: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ response }) => {
    return (
        <div className="container">
            <div className={styles.datum}>Access Token: {response.access_token}</div>
            <div className={styles.datum}>Refresh Token: {response.refresh_token}</div>
            <div className={styles.datum}>Expires At: {response.expires_at}</div>
        </div>
    )
};

export default StravaAuthCallback;