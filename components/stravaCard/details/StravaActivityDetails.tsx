import React, { FC } from "react"

import styles from "components/stravaCard/StravaCard.module.scss";
import { StravaActivity } from "types/strava";
import { Details } from "./Details";

interface StravaActivityDetailsProps {
    activity: StravaActivity;
}

export const StravaActivityDetails: FC<StravaActivityDetailsProps> = ({ activity }) => {
    return (
        <div className={styles.details}>
            <Details.Distance distance={activity.distance} />
            <Details.Pace pace={activity.average_speed} />
            <Details.Time time={activity.moving_time} />
        </div>
    )
}