export interface Error {
    status: number;
    message: string;
}

export interface CurrentlyPlayingTrack {
    item: {
        album: {
            images: string[];
            name: string;
        },
        artists: Array<{}>;
        name: string;
        preview_rul: string;
        uri: string;
        external_urls: {
            spotify: string;
        }
    }
}

export interface RefreshAccessResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

export interface RefreshAccessRequest {
    grant_type: string;
    refresh_token: string;
}