import {ChangeEvent, CSSProperties, FC} from "react";
import styles from "../styles/inputFilter.module.scss"

interface InputFilterProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    style?: CSSProperties
}

export const InputFilter:FC<InputFilterProps> = (props) => {
    return (
        <div style={props.style} className={styles["input-filter"]}>
            <div className={styles["input-filter__label"]}>{props.label || "Search:"}</div>
            <input value={props.value}
                   onChange={(event: ChangeEvent<HTMLInputElement>) => props.onChange(event.target?.value)}/>
        </div>
    );
};