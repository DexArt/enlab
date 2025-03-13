import {MdbStateSchema} from "store/mdb/types/types.ts";
import {PayloadAction} from "@reduxjs/toolkit";
import {MdbResponseDto} from "api";


export const MoviesReducers = {
    setLoading(state: MdbStateSchema, action: PayloadAction<boolean>) {
        state.movies.loading = action.payload;
    },
    setError(state: MdbStateSchema, action: PayloadAction<Error | null>) {
        state.movies.error = action.payload;
    },
    setResponse(state:MdbStateSchema, action: PayloadAction<MdbResponseDto>) {
        state.movies.response = action.payload;
        state.movies.totalPages = Math.ceil(action.payload.total_results / state.movies.moviesPerPage);
        state.movies.pagedMovies = [...state.movies.pagedMovies, ...[action.payload.results.slice(0, state.movies.moviesPerPage),action.payload.results.slice(state.movies.moviesPerPage)]];
    },
    setQuery(state: MdbStateSchema, action: PayloadAction<string>) {
        state.movies.request.query = action.payload;
        state.movies.currentPage = 1;
        state.movies.request.page = 1;
        state.movies.pagedMovies = [];
        state.movies.error = null;
    },
    setCurrentPage(state: MdbStateSchema, action: PayloadAction<number>) {
        state.movies.currentPage = action.payload;
        if (!state.movies.pagedMovies[action.payload]) {
            state.movies.request.page = Math.floor((action.payload - 1) / 2) + 1; // Calculate the API page
        }

    }
}