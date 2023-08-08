import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    students: []
};

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setStudents: (state, action) => {
            state.students = action.payload;
        },
        addStudent: (state, action) => {
            state.students.push(action.payload);
        },
        removeStudent: (state, action) => {
            state.students = state.students.filter(student => student.id !== action.payload);
        },
        updateStudent: (state, action) => {
            const index = state.students.findIndex(student => student.id === action.payload.id);
            state.students[index] = action.payload;
        }
    }
});

export const { addStudent, removeStudent, updateStudent, setStudents } = studentSlice.actions;

export default studentSlice.reducer;
