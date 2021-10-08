import { FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import React, { ChangeEvent, FC, useContext } from "react";

import { ActivitiesContext, MeasurementSystem } from "./ActivitiesContext";
import styles from "./ActivitiesMeasurementToggle.module.scss";

export const ActivitiesMeasurementToggle: FC = () => {
    const { measurementSystem, setMeasurementSystem } = useContext(ActivitiesContext);

    const handleMeasurementSystemChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
        setMeasurementSystem(value as MeasurementSystem);
    }

    return (
        <RadioGroup value={measurementSystem} className={styles.measurementSystem} onChange={handleMeasurementSystemChange}>
            <FormControl fullWidth={false}>
                <FormControlLabel control={<Radio value={MeasurementSystem.IMPERIAL} />} label={MeasurementSystem.IMPERIAL.valueOf()} />
            </FormControl>
            <FormControl fullWidth={false}>
                <FormControlLabel control={<Radio value={MeasurementSystem.METRIC} />} label={MeasurementSystem.METRIC.valueOf()} />
            </FormControl>
        </RadioGroup>
    );
}