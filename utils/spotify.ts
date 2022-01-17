import axios from "axios";
import qs from "qs";

import { CurrentlyPlayingTrack, RefreshAccessResponse } from "types/spotify";

const basicAuth =
    Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");

export const getCurrentlyPlayingTrack = (accessToken: string): Promise<{ status: number; data?: CurrentlyPlayingTrack}> => {
    return axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });
};

export const refreshAccessToken = (refreshToken: string): Promise<RefreshAccessResponse> => {
    return axios.post<string, { data: RefreshAccessResponse }>(
        "https://accounts.spotify.com/api/token",
        qs.stringify({
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        }),
        {
            headers: {
                "Authorization": `Basic ${basicAuth}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    ).then(response => response.data);
};