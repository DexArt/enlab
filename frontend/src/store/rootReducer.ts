import { combineReducers } from '@reduxjs/toolkit';
import mdbReducer from "./mdb/mdb.slice.ts";

const rootReducer = combineReducers({
    mdb: mdbReducer,
});

export default rootReducer;