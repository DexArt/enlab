import {createSlice} from '@reduxjs/toolkit';
import {MdbStateSchema} from "store/mdb/types/types";
import {MoviesReducers} from "store/mdb/reducers/MoviesReducers";



const initialState: MdbStateSchema = {
    movies: {
        currentPage: 1,
        moviesPerPage: 10,
        totalPages: 1,
        pagedMovies: [],
        response: {
            results: [],
            page: 1,
            total_pages: 0,
            total_results: 0,
        },
        request: {
            page: 1,
            query: "",
        },
        error: null,
        loading: false,
    },
};

const mdbSlice = createSlice({
    name: 'mdb',
    initialState,
    reducers: {
        ...MoviesReducers
    },
});

export const {setError, setLoading, setResponse, setCurrentPage, setQuery } = mdbSlice.actions;

export default mdbSlice.reducer;