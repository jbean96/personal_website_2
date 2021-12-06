import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import qs from "qs";

import { CurrentlyPlayingTrack, RefreshAccessRequest, RefreshAccessResponse } from "types/spotify";

let access: (Omit<RefreshAccessResponse, "expires_in"> & { expires_at: number }) | undefined;

const basicAuth =
    Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");

const getCurrentlyPlayingTrack = (): Promise<{ status: number; data?: CurrentlyPlayingTrack}> => {
    return axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers: {
                "Authorization": `Bearer ${access?.access_token}`,
                "Content-Type": "application/json"
            }
        });
};

const getRefreshAccessTokenRequestBody = (request: RefreshAccessRequest): string => {
    return qs.stringify(request);
};

const refreshAccessToken = (): Promise<RefreshAccessResponse> => {
    return axios.post<string, { data: RefreshAccessResponse }>(
        "https://accounts.spotify.com/api/token",
        getRefreshAccessTokenRequestBody({
            "grant_type": "refresh_token",
            "refresh_token": process.env.SPOTIFY_REFRESH_TOKEN as string
        }),
        {
            headers: {
                "Authorization": `Basic ${basicAuth}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    ).then(response => response.data);
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CurrentlyPlayingTrack | undefined>
) {
    try {
        if (access == null || Date.now() >= access.expires_at) {
            const refreshedAccess = await refreshAccessToken();
            access = { ...refreshedAccess, expires_at: Date.now() + refreshedAccess.expires_in * 1000 };
        }
        const response = await getCurrentlyPlayingTrack();
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(400).send(error);
    }
}