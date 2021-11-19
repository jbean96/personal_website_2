import { FC } from "react";

export interface MountainProps {
    className?: string;
    primary: string;
    secondary: string;
}

export const Mountain: FC<MountainProps> = ({ className, primary, secondary }) => {
    return (
        <svg
            className={className}
            width="150"
            height="100"
            viewBox="0 0 150 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <path d="M0 100L75 0L150 100L0 100" fill={primary} />
                <path d="M75 0L48 36L60 28L66 36L75 28L84 36L90 28L102 36L75 0" fill={secondary} />
            </g>
        </svg>
    );
};