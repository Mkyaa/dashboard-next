"use client"

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./app/auth/authSlice";
import studentReducer from "./app/student/studentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        student: studentReducer
    },
});

