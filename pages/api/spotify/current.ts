import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

import { CurrentlyPlayingTrack } from "types/spotify";
import { getCurrentlyPlayingTrack, refreshAccessToken } from "utils/spotify";
import { ApiError } from "types/api";

const mongoClient = new MongoClient(encodeURI(process.env.MONGO_DB_URI!));

interface SpotifyAccessInfo {
    refresh_token: string;
    access_token?: string;
    expires_at?: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CurrentlyPlayingTrack | ApiError | undefined>
) {
    return new Promise<void>(resolve => {
        mongoClient.connect(async () => {
            try {
                const collection = mongoClient.db("personalWebsite").collection("data");
                const response = await collection.findOne({ key: "spotify" });

                let accessInfo = response as unknown as SpotifyAccessInfo;

                if (
                    accessInfo.access_token == null ||
                accessInfo.expires_at == null ||
                accessInfo.expires_at <= Date.now()
                ) {
                    const { expires_in, access_token } = await refreshAccessToken(accessInfo.refresh_token);

                    await collection.findOneAndUpdate({ key: "spotify" }, {
                        $set: {
                            expires_at: Date.now() + expires_in * 1000,
                            access_token: access_token
                        }
                    });

                    accessInfo = await collection.findOne({ key: "spotify" }) as unknown as SpotifyAccessInfo;
                }

                if (accessInfo.access_token == null) {
                    throw new Error("Missing access token");
                }

                const currentTrackResponse = await getCurrentlyPlayingTrack(accessInfo.access_token);

                res.status(currentTrackResponse.status).json(currentTrackResponse.data);
            } catch {
                res.status(400).send({ error: "Error loading current track" });
            } finally {
                mongoClient.close();
                resolve();
            }
        });
    });
}