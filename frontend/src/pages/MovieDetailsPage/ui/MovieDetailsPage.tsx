import {FC, useEffect, useState} from "react";
import styles from '../styles/movieDetailsPage.module.scss';
import {getMdbMovieById, MdbMovieDetails} from "api";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "shared/Button";

interface MovieDetailsPageProps {}

export const MovieDetailsPage:FC<MovieDetailsPageProps> = () => {
    const {movieId} = useParams<{movieId:string}>()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [movie, setMovie] = useState<MdbMovieDetails | null>(null);
    const navigation = useNavigate()


    useEffect(() => {
        setIsLoading(true);
        if(movieId) {
            try {
                getMdbMovieById({id: Number(movieId)}).then((response) => {
                    setMovie(response);
                }).catch((_) => {
                    navigation("/not-found", {replace: true});
                }).finally(() => {
                    setIsLoading(false);
                });
            }catch (err) {
                navigation("/not-found", {replace: true});
            }
        }else {
            navigation("/not-found", {replace: true});
        }
    }, [movieId]);

    const handleNavigate = (path: string) => {
        window.open(path, "_blank");
    }



    return (
        <div className={styles["movie-details-page"]}>
            <div className={styles["movie-details-page__backdrop"]}>
                <div className={styles["movie-details-page__backdrop__image"]}
                     style={{height: movie?.backdrop_path ? "100%" : "50vW"}}>
                    {movie?.backdrop_path && (
                        <img src={movie.backdrop_path} alt={movie.title}/>
                    )}
                </div>
                <div className={styles["movie-details-page__backdrop__content"]}>
                    <div className={styles["movie-details-page__backdrop__content__title"]}>{movie?.title}</div>
                    <div
                        className={styles["movie-details-page__backdrop__content__body"]}>{"Watch from "}{movie?.release_date}</div>
                    <div className={styles["movie-details-page__backdrop__content__footer"]}>
                        {!!movie?.homepage?.length && (
                            <Button onClick={() => handleNavigate(movie?.homepage || "")}>Official site</Button>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles["movie-details-page__content"]}>
                <div className={styles["movie-details-page__content__data"]}>
                    <MovieDetailInfo loading={isLoading}
                                     className={styles["movie-details-page__content__data__info"]}
                                     label={"Rating"} value={movie?.vote_average.toString() || ""}/>
                    <MovieDetailInfo loading={isLoading}
                                     className={styles["movie-details-page__content__data__info"]}
                                     label={"Runtime"} value={movie?.runtime.toString() || ""}/>
                    <MovieDetailInfo loading={isLoading}
                                     className={styles["movie-details-page__content__data__info"]}
                                     label={"Budget"} value={movie?.budget ? movie.budget.toString() : "N/A"}/>
                    <MovieDetailInfo loading={isLoading}
                                     className={styles["movie-details-page__content__data__info"]}
                                     label={"Revenue"}
                                     value={movie?.revenue ? movie.revenue.toString() : "N/A"}/>
                    <MovieDetailInfo loading={isLoading}
                                     className={styles["movie-details-page__content__data__info"]}
                                     label={"Genres"}
                                     value={movie?.genres.map((genre) => genre.name).join(", ") || ""}/>
                    <MovieDetailInfo loading={isLoading}
                                     className={styles["movie-details-page__content__data__info"]}
                                     label={"Overview"} value={movie?.overview || "N/A"}/>
                </div>
            </div>
        </div>
    );
};

const MovieDetailInfo: FC<{ className?: string, label: string, value: string, loading: boolean }> = (props) => {
    return (
        <div className={props.className}>
            <div className={styles["detail-label"]}>{`${props.label}:`}</div>
            {props.loading ? (
                <div className={"skeleton skeleton-text"}/>
            ) : (
                <div className={styles["detail-value"]}>{`${props.value}`}</div>
            )}
        </div>
    )
};