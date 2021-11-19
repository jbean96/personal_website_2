import { FC } from "react";
import Link, { LinkProps } from "next/link";

import styles from "./InternalLink.module.scss";

/**
 * Wrapper component for common styling of links displayed within paragraph bodies and text that are
 * not navigational components.
 */
const InternalLink: FC<LinkProps> = (props) => {
    const { children, ...rest } = props;
    return (
        <Link {...rest}>
            <span className={styles.link}>{children}</span>
        </Link>
    );
};

export default InternalLink;