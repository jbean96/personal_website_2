import { FC } from "react";

import cardStyles from 'styles/Card.module.css';

export interface CardProps {
    title: string;
}

export const Card: FC<CardProps> = ({ children, title }) => {
    return (
        <div className={cardStyles.card}>
            <div className={cardStyles.title}>
                {title}
            </div>
            {children}
        </div>
    )
}