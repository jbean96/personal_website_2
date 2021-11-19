import { PostMetadata } from "./posts.types";

export const validatePostMetadata = (metadata: { [key: string]: any }): metadata is PostMetadata => {
    if (metadata.title == null || metadata.description == null || metadata.date == null) {
        return false;
    }
    return true;
};