import axios from "axios";
import { useEffect, useState, VFC } from "react";
import styled from "styled-components";

import { CurrentlyPlayingTrack } from "types/spotify";

const StyledBlogFooter = styled.div`
    padding: ${({ theme }) => theme.spacing(2, 4)};
    display: flex;
    justify-content: center;
    width: min(400px, 100%);
    margin-left: auto;
    margin-right: auto;

    .text-wrapper {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export interface BlogFooterProps {
    className?: string;
}

export const BlogFooter: VFC<BlogFooterProps> = ({ className }) => {
    const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState<CurrentlyPlayingTrack>();

    useEffect(() => {
        axios.get<CurrentlyPlayingTrack>("/api/spotify/current")
            .then((response) => setCurrentlyPlayingTrack(response.data));
    }, []);

    return (
        <StyledBlogFooter className={className}>
            <div className="text-wrapper">
                {currentlyPlayingTrack?.item.name}
            </div>
        </StyledBlogFooter>
    );
};