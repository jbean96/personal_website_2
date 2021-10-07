import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from 'types/api';
import { StravaActivity } from 'types/strava'
import { getEnvVariables } from 'utils/env'
import fs from "fs";
import { PublishedWithChanges } from '@mui/icons-material';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<StravaActivity[]>>
) {
    const envVariables = getEnvVariables();

    const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 1;

    // await axios.get<never, AxiosResponse<StravaActivity[]>>(`https://www.strava.com/api/v3/athlete/activities?page=${page}`, { headers: { authorization: `Bearer ${envVariables.strava.accessToken}` }})
    //     .then(response => response.data)
    //     .then(activities => res.status(200).json({ data: activities.filter(activity => !activity.private) }))
    //     .catch((error) => {
    //       console.error(error);
    //       res.status(400).send({});
    //     });

    try {
      // TODO: use current directory? 
      const data = fs.readFileSync("./pages/api/strava/activities.response.json");
      const activities: StravaActivity[] = JSON.parse(data.toString('utf-8'));

      const activityPage = activities.slice((page - 1) * 30, page * 30);

      res.status(200).json({ data: activityPage });
    } catch (error) {
      console.error(error);
      res.status(500).json({});
    }
}
