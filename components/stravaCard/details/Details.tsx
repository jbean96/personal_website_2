import { FC } from "react";
import { Height, Timer } from "@mui/icons-material";
import { StravaActivity } from "types/strava";

import styles from 'components/stravaCard/StravaCard.module.scss';

export namespace Details {
    interface DistanceProps {
        distance: StravaActivity['distance'];
    }
    
    export const Distance: FC<DistanceProps> = ({ distance }) => {
        return (
            <div className={styles.detail}>{distance}m</div>
        );
    }
    
    interface TimeProps {
        time: StravaActivity['moving_time'];
    }
    
    export const Time: FC<TimeProps> = ({ time }) => {
        return (
            <div className={styles.detail}>
                <Timer />
                <div>{time}s</div>
            </div>
        );
    }

    interface ElevationProps {
        elevation: StravaActivity['total_elevation_gain'];
    }

    export const Elevation: FC<ElevationProps> = ({ elevation }) => {
        return (
            <div className={styles.detail}>
                <Height />
                <div>{elevation}m</div>
            </div>
        )
    }
}