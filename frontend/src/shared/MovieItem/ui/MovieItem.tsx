import {FC} from "react";
import styles from '../styles/movieItem.module.scss';
import {MdbMovie} from "api";
import {Button} from "shared/Button";
import {useNavigate} from "react-router-dom";

interface MovieItemProps {
    row: MdbMovie | null;
    loading?: boolean;
}

export const MovieItem:FC<MovieItemProps>  = (props) => {

    const navigate = useNavigate();


    const getPoster = () => {
        if(props.loading) {
            return (<div className={"skeleton skeleton__poster"}/>)
        }
        return props?.row?.poster_path ? (
            <img
                src={props.row.poster_path}
                alt={props.row.title}
            />
        ) : (
            <div className={styles["movie-item__poster___placeholder"]}>
                <span>No poster</span>
            </div>
        )
    }

    return (
        <div className={styles["movie-item"]}>
            <div className={styles["movie-item__poster"]}>
                {getPoster()}
            </div>
            <div className={styles["movie-item__details"]}>
                {props.loading ? (<h2 className={"skeleton skeleton__text skeleton__text--title"}/>) : (
                    <h2 className={styles["movie-item__details__title"]}>{"Title: "}{props?.row?.title || "N/A"}</h2>)}
                {props.loading ? (<h2 className={"skeleton skeleton__text skeleton__text--body"}/>) : (
                    <p className={styles["movie-item__details__overview"]}>{"Overview: "}{props?.row?.overview || "N/A"}</p>)}
                {props.loading ? (<h2 className={"skeleton skeleton__text skeleton__text--footer"}/>) : (
                    <p className={styles["movie-item__details__release-date"]}>{"Release Date: "}{props?.row?.release_date || "N/A"}</p>)}
                <div className={styles["movie-item__details__actions"]}>
                    <Button onClick={() => navigate(`/movie/${props.row?.id}`)} disabled={props.loading}>Show Details</Button>
                </div>
            </div>
        </div>
    );
};