import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";

const store = configureStore({
    reducer : {
        //add file authReducer.ts
        authReducer
    }
})

export default store