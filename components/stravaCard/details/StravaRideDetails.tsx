import { FC } from "react"
import { StravaRideActivity } from "types/strava"

import styles from 'components/stravaCard/StravaCard.module.scss';
import { Details } from "./Details";

interface StravaRideDetailsProps {
    activity: StravaRideActivity;
}

export const StravaRideDetails: FC<StravaRideDetailsProps> = ({ activity }) => {
    return (
        <div className={styles.details}>
            <Details.Distance distance={activity.distance} />
            <Details.Elevation elevation={activity.total_elevation_gain} />
            <Details.Time time={activity.moving_time} />
        </div>
    )
}