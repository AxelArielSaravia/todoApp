import {configureStore} from "@reduxjs/toolkit";
import {filtersReducer} from "./features/filter/filterReducer.js";
import {todosReducer} from "./features/todos/todosReducer.js";

const rootReducer = configureStore({
    reducer: {
        todos: todosReducer,
        filters: filtersReducer
    },
});

export default rootReducer;