import { DirectionsBike, DirectionsRun, DirectionsWalk, Pool } from "@mui/icons-material";
import React from "react";

import { StravaActivity, StravaActivityType, StravaRideActivity } from "types/strava";

import { getActivityUrl } from "utils/strava";

import cardStyles from 'styles/Card.module.scss';
import styles from './StravaCard.module.scss';
import { StravaRideDetails } from "./details/StravaRideDetails";

export interface StravaCardProps {
    activity: StravaActivity;
}

const getIconFromActivityType = (activityType: StravaActivityType) => {
    switch (activityType) {
        case StravaActivityType.HIKE:
            return <DirectionsWalk />;
        case StravaActivityType.RIDE:
        case StravaActivityType.VIRTUAL_RIDE:
            return <DirectionsBike />;
        case StravaActivityType.RUN:
            return <DirectionsRun />;
        case StravaActivityType.SWIM:
            return <Pool />;
        default:
            return null;
    }
}

const getActivityDetails = (activity: StravaActivity) => {
    switch (activity.type) {
        case StravaActivityType.RIDE:
        case StravaActivityType.VIRTUAL_RIDE:
            return <StravaRideDetails activity={activity as StravaRideActivity} />;
        default:
            return null;
    }
}

export const StravaCard = React.forwardRef<HTMLDivElement, StravaCardProps>(({ activity }, ref) => {
    const icon = getIconFromActivityType(activity.type);

    return (
        <div ref={ref} className={cardStyles.card}>
            <div className={cardStyles.content}>
                <div className={cardStyles.header}>
                    {icon && <div className={styles.icon}>{icon}</div>}
                    <div className={cardStyles.title}>{activity.name}</div>
                </div>
                {getActivityDetails(activity)}
            </div>
            <a className={styles.activityLink} href={getActivityUrl(activity.id)} target="_blank" rel="noopener noreferrer">View on Strava</a>
        </div>
    )
});