import {useDispatch} from "react-redux";
import ConfigTodoItem from "./ConfigTodoItem.js";

export default function AddTodoItem({closeModal}) {
    const dispatch = useDispatch();

    function addTodo(text, color, tags) {
        dispatch({
            type: "todos/todoAdded",
            payload: {text, color, tags}
        });
    }
    return (
        <ConfigTodoItem
            closeModal={closeModal}
            setTodo={addTodo}
        />
    );
}