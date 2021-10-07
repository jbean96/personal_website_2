export type StravaAuthTokenRequest = {
    client_id: number;
    client_secret: string;
    code: string;
    grant_type: 'authorization_code';
}

export type StravaAuthToken = {
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    token_type: string;
}

export enum StravaActivityType {
    HIKE = "Hike",
    RIDE = "Ride",
    VIRTUAL_RIDE = "VirtualRide",
    RUN = "Run",
    SWIM = "Swim"
}

export type StravaActivity = {
    id: number;
    /**
     * The name of the activity
     */
    name: string;
    /**
     * The activity's distance (meters)
     */
    distance: number;
    /**
     * The activity's moving time (seconds)
     */
    moving_time: number;
    /**
     * The activity's elapsed time (seconds)
     */
    elapsed_time: number;
    /**
     * The activity's total elevation gain
     */
    total_elevation_gain: number;
    /**
     * The type of the activity
     */
    type: StravaActivityType;
    /**
     * The time at which the activity was started
     */
    start_date: string;
    /**
     * Whether this activity is private
     */
    private: boolean;
    /**
     * The activity's average speed (meters/second)
     */
    average_speed: number;
}

export interface StravaRunActivity extends StravaActivity {
    type: StravaActivityType.RUN;
}

export interface StravaRideActivity extends StravaActivity {
    type: StravaActivityType.RIDE | StravaActivityType.VIRTUAL_RIDE;
}