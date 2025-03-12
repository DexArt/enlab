import {FC, useEffect} from "react";
import {InputFilter} from "shared/InputFilter";
import {DataList} from "shared/DataList";
import {useAppDispatch, useAppSelector} from "store/store";
import {useDebouncedInput} from "helpers/hooks/useDebouncedInput";
import {setCurrentPage, setError, setLoading, setQuery, setResponse} from "store/mdb/mdb.slice";
import {getMdbMovies} from "api";
import {MovieItem} from "shared/MovieItem";
import styles from '../styles/moviesPage.module.scss';
import useQueryParams from "helpers/hooks/useQueryParams";


interface MoviesPageProps {}

export const MoviesPage:FC<MoviesPageProps> = () => {
    const {pagedMovies, currentPage,totalPages,error,moviesPerPage,request,loading} = useAppSelector(state => state.mdb.movies);
    const dispatch = useAppDispatch();
    const [inputValue, debouncedValue, setInputValue] = useDebouncedInput(request.query,300);
    const [queryParams, setQueryParams] = useQueryParams("query","");

    useEffect(() => {
        if(queryParams) {
            setInputValue(queryParams);
        }
    }, [queryParams]);

    useEffect(() => {
        dispatch(setQuery(debouncedValue));
        setQueryParams(debouncedValue);
    }, [debouncedValue]);

    useEffect(() => {
        try {
            dispatch(setLoading(true));
            getMdbMovies(request).then((response) => {
                dispatch(setResponse(response));
            }).catch((error) => {
                dispatch(setError(error));
            }).finally(() => {
                dispatch(setLoading(false));
            });
        }catch (error) {
            dispatch(setError(error as Error));
        }
    }, [request,dispatch]);




    return (
        <div className={styles["movies-page"]}>
            <div className={styles["movies-page__header"]}>
                <div className={styles["movies-page__header__logo"]}>
                    <img src={"/logo.svg"} alt={"Logo"}/>
                </div>
                <InputFilter
                    value={inputValue}
                    onChange={setInputValue}
                />
            </div>
            {error && <div className={styles["movies-page__error"]}>{error.message}</div>}
            {!error && (
                <DataList
                    currentPage={currentPage}
                    loading={loading}
                    itemsPerPage={moviesPerPage}
                    totalPages={totalPages}
                    data={pagedMovies[currentPage - 1] || []}
                    renderRow={(row, loading) => <MovieItem row={row} loading={loading}/>}
                    onPageChange={(newPage) => dispatch(setCurrentPage(newPage))}
                />
            )}
        </div>
    );
};