import { StravaActivity } from 'types/strava';

export const getActivityUrl = (id: StravaActivity['id']) => `https://www.strava.com/activities/${id}`;