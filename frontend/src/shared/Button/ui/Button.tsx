import {ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";
import styles from "../styles/button.module.scss"

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{}

export const Button:FC<ButtonProps> = ({ children, className, ...props}) => {
    return (
        <button className={[styles["button"], className].join(" ")} {...props}>{children}</button>
    );
};