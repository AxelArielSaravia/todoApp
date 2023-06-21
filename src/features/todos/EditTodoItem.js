import {useSelector, useDispatch} from "react-redux";
import ConfigTodoItem from "./ConfigTodoItem.js";

const selectTodoItem = (state, id) => state.todos[id];
export default function EditTodoItem({closeModal, id}) {
    const todoItem = useSelector((state) => selectTodoItem(state, id));
    const dispatch = useDispatch();

    function editTodo(text, color, tags, dateNow) {
        dispatch({
            type: "todos/todoEdit",
            payload: {
                id,
                todo: {text, color, tags, dateNow}
            }
        });
    }
    return (
        <ConfigTodoItem
            closeModal={closeModal}
            setTodo={editTodo}
            text={todoItem.text}
            color={todoItem.color}
            tags={todoItem.tags}
            editDate
        />
    );
}