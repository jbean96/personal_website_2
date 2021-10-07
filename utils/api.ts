import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "types/api";
import { StravaActivity } from "types/strava";

export const getStravaActivities = async (page: number = 0): Promise<StravaActivity[]> => {
    try {
        const response = await axios.get<never, AxiosResponse<ApiResponse<StravaActivity[]>>>(`/api/strava/activities?page=${page}`).then(response => response.data);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.reject();
}