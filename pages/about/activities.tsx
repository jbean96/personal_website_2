import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";

import { StravaActivity } from "types/strava";
import { getStravaActivities } from "utils/api";
import { StravaCard } from "components/stravaCard/StravaCard";
import { ActivitiesContextProvider } from "components/activities/ActivitiesContext";

import commonStyles from 'styles/common.module.scss';
import styles from 'styles/about/Activities.module.css';
import { ActivitiesMeasurementToggle } from "components/activities/ActivitiesMeasurementToggle";

const Activities: NextPage = () => {
    const [activities, setActivities] = useState<StravaActivity[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const lastActivityRef = useRef<HTMLDivElement>(null);
    const intersectionObserver = useRef<IntersectionObserver>();

    useEffect(() => {
        intersectionObserver.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setPageNumber(pageNumber => pageNumber + 1);
                }
            });
        });
    }, []);

    useEffect(() => {
        if (lastActivityRef.current != null && !isLoading) {
            intersectionObserver.current?.observe(lastActivityRef.current);
        }

        return () => {
            if (lastActivityRef.current != null) {
                intersectionObserver.current?.unobserve(lastActivityRef.current);
            }
        }
    }, [lastActivityRef.current, isLoading]);
    
    useEffect(() => {
        setIsLoading(true);
        // TODO: Determine when to stop loading (i.e. received last page).
        getStravaActivities(pageNumber)
            .then((response) => setActivities((currentActivities) => currentActivities.concat(response)))
            .finally(() => setIsLoading(false));
    }, [pageNumber]);

    return (
        <div className={styles.activityPage}>
            <Head>
                <title>Strava Activity</title>
                <meta name="description" content="Josh's activity recorded on Strava" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={commonStyles.header}>
                <div className={commonStyles.title}>Strava Activity</div>
                <div className={commonStyles.description}>
                    I try to stay active, biking is my vice and where I spend the majority of my spare time/money. I also run,
                    hike, ski and am always excited to try new activities that get my blood flowing and my body engaged.
                </div>
            </div>
            <ActivitiesContextProvider>
                {/* TODO: Summary details? Total activities this month? Last month? */}
                <div className={styles.controls}>
                    <ActivitiesMeasurementToggle />
                </div>
                {/* TODO: Add breakpoints from month/year? */}
                {activities.map((activity, index) => {
                    return (
                        <StravaCard 
                            ref={index === activities.length - 1 ? lastActivityRef : undefined} 
                            key={activity.id} 
                            activity={activity} 
                        />
                    );
                })}
            </ActivitiesContextProvider>
        </div>

    )
}

export default Activities;