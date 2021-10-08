import { FC, useContext } from "react";
import { Height, ModeCommentTwoTone, Timer } from "@mui/icons-material";
import { StravaActivity } from "types/strava";

import styles from 'components/stravaCard/StravaCard.module.scss';
import { ActivitiesContext, ActivityFilter, MeasurementSystem } from "components/activities/ActivitiesContext";
import NumberFormat from "react-number-format";
import moment from "moment";

type Conversion = {
    label: string;
    fn: (unit: number) => number;
}

const Number: FC<{ value: number, decimals?: number }> = ({ value, decimals = 1 }) => {
    return (
        <NumberFormat value={value} decimalScale={decimals} thousandSeparator={true} displayType="text" />
    );
}

export namespace Details {
    const DistanceConversionMap: Record<MeasurementSystem, Conversion> = {
        [MeasurementSystem.IMPERIAL]: { label: "mi", fn: (meters => meters / 1609.344) },
        [MeasurementSystem.METRIC]: { label: "km", fn: (meters => meters / 1000)},
    };

    const ElevationConversionMap: Record<MeasurementSystem, Conversion> = {
        [MeasurementSystem.IMPERIAL]: { label: "ft", fn: (meters => meters * 3.28084) },
        [MeasurementSystem.METRIC]: { label: "m", fn: (meters => meters) },
    };

    interface DistanceProps {
        distance: StravaActivity['distance'];
    }
    
    export const Distance: FC<DistanceProps> = ({ distance }) => {
        const { measurementSystem } = useContext(ActivitiesContext);

        const { label, fn } = DistanceConversionMap[measurementSystem];

        return (
            <div className={styles.detail}>
                <Number value={fn(distance)} />
                {label}
            </div>
        );
    }
    
    interface TimeProps {
        time: StravaActivity['moving_time'];
    }
    
    export const Time: FC<TimeProps> = ({ time }) => {
        const millis = moment.duration(time, "seconds").asMilliseconds();
        const format = millis < 3_600_000 ? "mm:ss" : "H:mm:ss";

        return (
            <div className={styles.detail}>
                <Timer />
                <div>{moment.utc(millis).format(format)}</div>
            </div>
        );
    }

    interface ElevationProps {
        elevation: StravaActivity['total_elevation_gain'];
    }

    export const Elevation: FC<ElevationProps> = ({ elevation }) => {
        const { measurementSystem } = useContext(ActivitiesContext);

        const { label, fn } = ElevationConversionMap[measurementSystem];

        return (
            <div className={styles.detail}>
                <Height />
                <Number value={fn(elevation)} decimals={0} />
                {label}
            </div>
        )
    }

    interface PaceProps {
        pace: StravaActivity['average_speed'];
    }

    export const Pace: FC<PaceProps> = ({ pace }) => {
        const { measurementSystem } = useContext(ActivitiesContext);

        const { label, fn } = DistanceConversionMap[measurementSystem];

        return (
            <div className={styles.detail}>
                <div><Number value={fn(pace) * 3600} />{label}/hr</div>
            </div>
        )
    }
}