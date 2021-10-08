import React, { Dispatch, FC, SetStateAction, useMemo, useState } from "react"
import { StravaActivity, StravaActivityType } from "types/strava";

export enum MeasurementSystem {
    IMPERIAL = "Imperial",
    METRIC = "Metric"
}

export enum ActivityFilter {
    ALL,
    BIKE,
    HIKE,
    SWIM
}

export const ActivityFilterLookup = new Map<ActivityFilter, StravaActivityType[]>([
    [ActivityFilter.ALL, []],
    [ActivityFilter.BIKE, [StravaActivityType.RIDE, StravaActivityType.VIRTUAL_RIDE]],
    [ActivityFilter.HIKE, [StravaActivityType.HIKE]],
    [ActivityFilter.SWIM, [StravaActivityType.SWIM]]
]);

export type ActivityFilterFn = (activity: StravaActivity) => boolean;

export const getActivityFilterFunction: (filter: ActivityFilter) => ActivityFilterFn = (filter: ActivityFilter) => {
    if (filter === ActivityFilter.ALL) {
        return () => true;
    }
    
    const activityTypes = ActivityFilterLookup.get(filter);

    return (activity) => activityTypes?.includes(activity.type) ?? false;
}

export type ActivitiesContextType = {
    measurementSystem: MeasurementSystem;
    setMeasurementSystem: Dispatch<SetStateAction<MeasurementSystem>>;

    activityFilterFn: ActivityFilterFn;
    setActivityFilter: Dispatch<SetStateAction<ActivityFilter>>;
}

export const ActivitiesContext = React.createContext<ActivitiesContextType>({
    measurementSystem: MeasurementSystem.IMPERIAL,
    setMeasurementSystem: () => {},

    activityFilterFn: () => false,
    setActivityFilter: () => {},
});

export const ActivitiesContextProvider: FC = ({ children }) => {
    const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>(MeasurementSystem.IMPERIAL);
    const [activityFilter, setActivityFilter] = useState<ActivityFilter>(ActivityFilter.ALL);

    const activityFilterFn = useMemo(() => getActivityFilterFunction(activityFilter), [activityFilter]);

    const value = useMemo(() => ({
        measurementSystem,
        setMeasurementSystem,

        activityFilterFn,
        setActivityFilter
    }), [measurementSystem]);

    return (
        <ActivitiesContext.Provider value={value}>
            {children}
        </ActivitiesContext.Provider>
    );
}