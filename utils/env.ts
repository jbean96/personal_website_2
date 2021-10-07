export interface StravaCredentials {
    accessToken: string;
    clientId: number;
    clientSecret: string;
    expiresAt: number;
    refreshToken: string;
}

export interface EnvVariables {
    domain: string;
    strava: StravaCredentials;
}

export const getEnvVariables = (): EnvVariables => {
    const domain = process.env.DOMAIN;
    const stravaClientId = process.env.STRAVA_CLIENT_ID;
    const stravaClientSecret = process.env.STRAVA_CLIENT_SECRET;
    const stravaAccessToken = process.env.STRAVA_ACCESS_TOKEN;
    const stravaRefreshToken = process.env.STRAVA_REFRESH_TOKEN;
    const expiresAt = process.env.STRAVA_EXPIRES_AT;

    if (domain == null || stravaClientId == null || stravaClientSecret == null || stravaAccessToken == null || stravaRefreshToken == null || expiresAt == null) {
        throw new Error('Missing environment varibable');
    }

    return {
        domain,
        strava: {
            accessToken: stravaAccessToken,
            refreshToken: stravaRefreshToken,
            expiresAt: parseInt(expiresAt),
            clientId: parseInt(stravaClientId),
            clientSecret: stravaClientSecret,
        },
    };
}