import { Icon } from "@iconify/react";
import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, VFC } from "react";
import styled from "styled-components";

import { CurrentlyPlayingTrack as CurrentlyPlayingTrackType } from "types/spotify";

const StyledIcon = styled(Icon)`
    margin-right: ${({ theme }) => theme.spacing(1)};
    font-size: 1.3em;
    vertical-align: sub;
    color: #1DB954;
`;

export const CurrentlyPlayingTrack: VFC = () => {
    const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState<CurrentlyPlayingTrackType>();

    useEffect(() => {
        axios.get<CurrentlyPlayingTrackType>("/api/spotify/current")
            .then((response) => {
                if (response.status === 200) {
                    setCurrentlyPlayingTrack(response.data);
                }
            });
    }, []);

    const trackName = currentlyPlayingTrack?.item.name;

    return (
        <Typography variant="body1">
            <StyledIcon icon="mdi:spotify" fr={undefined} />
            <span>{trackName ?? "No Track Currently Playing"}</span>
        </Typography>
    );
};