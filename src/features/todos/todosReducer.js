/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */
/*-
@type colors: "none" | "purple" | "red" | "green" | "brown" | "yellow" | "blue" | "pink"
@type TodoItem: {
    color: colors,
    completed: boolean,
    date: Date,
    id: string,
    tags: Arrav<string>,
    text: string
}
@type MaybeTodoItem: Maybe<TodoItem>
*/
/* -------------------------------------------------------------------------- */
/*                              UTILITY FUCTIONS                              */
/* -------------------------------------------------------------------------- */
/*-
createId: undefined -> string
*/
function createId() {
    const values = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";
    let str = Date.now() + "";
    for (let i = 0; i < 8; i += 1) {
        const indexValue = Math.floor(Math.random() * values.length);
        const indexPosition = Math.floor(Math.random() * str.length);
        str = str.slice(0, indexPosition) + values[indexValue] + str.slice(indexPosition);
    }
    return str;
}

/*-
editTodoState: (TodoItem, {
    color: colors,
    dateNow: boolean
    tags: Array<string>,
    text: string
}) -> TodoItem
*/
function editTodoState (original, {
    color = "",
    dateNow = false,
    tags,
    text = ""
}) {
    return {
        color: (color ? color : original.color),
        completed: original.completed,
        date: (dateNow ? Date.now() : original.date),
        id: original.id,
        tags: (Array.isArray(tags) ? tags : original.tags),
        text: (text ? text : original.text)
    };
}

/*-
setLocalStorage: (string, object) -> undefined
*/
function setLocalStorage(item, obj) {
    localStorage.setItem(item, JSON.stringify(obj));
}

/* -------------------------------------------------------------------------- */
/*                                 STATES                                     */
/* -------------------------------------------------------------------------- */
/*-
createTodoState: {
    color: colors,
    tags: Array<string>,
    text: string
} -> [string, TodoItem]
*/
function createTodoState ({
    color = "none",
    tags = [],
    text = "Nothing"
}) {
    const id = createId();
    const obj = {
        color,
        completed: false,
        date: Date.now(),
        id,
        tags,
        text,
    };
    return [id, obj];
}

/*-
setInitTodosState: undefined -> {} | MaybeTodoItem
*/
function setInitTodosState() {
    try {
        const localTodos = JSON.parse(localStorage.getItem("todos"));
        if (localTodos == null) {
            localStorage.setItem("todos", JSON.stringify({}));
            return {};
        }
        return localTodos;
    } catch {
        return {};
    }
}

const initTodosState = setInitTodosState();

/* -------------------------------------------------------------------------- */
/*                                  REDUCERS                                  */
/* -------------------------------------------------------------------------- */
/*-
todosReducer: (TodoItem, {
    type: "todos/todoAdded"
        | "todos/allCompleted"
        | "todos/completedCleared"
        | "todos/completedCleared"
        | "todos/todoDeleted"
        | "todos/todoEdit"
        | "todos/todoToggled",
    payload: undefined | string | any
}) -> TodoItem
*/
function todosReducer(state = initTodosState, action) {
    const type = action.type;
    if (type === "todos/todoAdded") {
        const [id, newTodo] = createTodoState(action.payload);
        const todos = {
            ...state,
            [id]: newTodo
        };
        setLocalStorage("todos", todos);
        return todos;
    }
    if (type === "todos/allCompleted") {
        const newTodos = {...state};
        Object.keys(newTodos).forEach(function (key) {newTodos[key].completed = true;});
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return newTodos;
    }
    if (type === "todos/completedCleared") {
        const newTodos = {...state};
        Object.keys(newTodos).forEach(function (key) {
            if (newTodos[key].completed) {
                delete newTodos[key];
            }
        });
        setLocalStorage("todos", newTodos);
        return newTodos;
    }
    if (type === "todos/todoDeleted") {
        const id = action.payload;
        if (state[id] !== undefined) {
            const newTodos = {...state};
            delete newTodos[id];
            setLocalStorage("todos", newTodos);
            return newTodos;
        }
        return state;
    }
    if (type === "todos/todoEdit") {
        const id = action.payload.id;
        if (state[id] !== undefined) {
            const newTodos = {
                ...state,
                [id]: editTodoState(state[id], action.payload.todo)
            };
            setLocalStorage("todos", newTodos);
            return newTodos;
        }
        return state;
    }
    if (type === "todos/todoToggled") {
        const id = action.payload;
        if (state[id] !== undefined) {
            const todo = {...state[id]};
            todo.completed = !todo.completed;
            const newTodos = {...state, [id]: todo};
            setLocalStorage("todos", newTodos);
            return newTodos;
        }
        return state;
    }
    return state;
}

export {
    todosReducer
};
