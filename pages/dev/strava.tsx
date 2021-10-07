import { InferGetStaticPropsType, NextPage } from 'next';

export const getStaticProps = async () => {
    const callbackDomain = process.env.DOMAIN;
    const stravaClientIdRaw = process.env.STRAVA_CLIENT_ID;
    if (stravaClientIdRaw == null) {
        throw new Error('Environment variable STRAVA_CLIENT_ID missing...');
    }
    if (callbackDomain == null) {
        throw new Error('Environment variable DOMAIN missing...');
    }

    return {
        props: { 
            callbackDomain: process.env.DOMAIN,
            stravaClientId: parseInt(stravaClientIdRaw)
        },
    };
}

const StravaAuth: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ callbackDomain, stravaClientId }) => {
    return (
        <div className="container">
            <a href={`http://www.strava.com/oauth/authorize?client_id=${stravaClientId}&response_type=code&redirect_uri=http://${callbackDomain}/dev/stravaCallback&approval_prompt=force&scope=activity:read`}>Authenticate</a>
        </div>
    )
}

export default StravaAuth;