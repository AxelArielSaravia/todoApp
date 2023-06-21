import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteTagsFromDataTags} from "../../DataTags.js";
import TagItem from "../TagItem.js";

import {IconClose, IconCheckmark, IconCircle} from "../icons/icons.js";

import "./TodoItem.scss";

function selectTodo(state, id) {
    return state.todos[id];
}

function unknown() {}

export default function TodoItem({id, setModal}) {
    const todoData = useSelector(function (state) {
        return selectTodo(state, id);
    });
    const _completed = todoData.completed;
    const [deleted, setDeleted] = useState(false);
    const [completed, setCompleted] = useState(_completed);
    const dispatch = useDispatch();

    useEffect(function () {
        if (_completed) {
            setCompleted(function () {return setCompleted;});
        }
    }, [_completed]);

    const stringDate = (new Date(todoData.date)).toLocaleString({
        dateStyle: "short",
        timeStyle: "short"
    });
    const color = (
        todoData.color !== "none"
        ? "var(--c-" + todoData.color + ")"
        : ""
    );
    const backgroundColor = (
        todoData.color !== "none"
        ? `var(--c-${todoData.color})`
        : "var(--c-secondary)"
    );
    const completedClass = (
        completed
        ? "todo-item p-3 completed"
        : "todo-item p-3"
    );
    const deletedClass = (deleted ? " deleted" : "");

    function onClickDelete() {
        setDeleted(true);
        setTimeout(function () {
            deleteTagsFromDataTags(todoData.tags);
            dispatch({type: "todos/todoDeleted", payload: id});
        }, 300);
    }
    const _onClickDelete = (
        completed
        ? onClickDelete
        : unknown
    );
    function onClickCheckmark() {
        setCompleted(function (state) {return !state;});
        setTimeout(function () {
            dispatch({type: "todos/todoToggled", payload: id});
        },300);
    }
    function onClickEdit () {
        setModal({type: "modal/editTodo", payload: id});
    }
    const _onClickEdit = (
        completed
        ? unknown
        : onClickEdit
    );

    return (
        <div className={completedClass + deletedClass}>
            <div className="flex-row br-2" style={{color: color}}>
                <div className="todo-item_left p-2">
                    <div className="todo-item_header flex-row align-c justify-sb">
                        <button
                            type="button"
                            className="todo-edit br-2"
                            title={completed ? "you can not edit now"  : "edit todo"}
                            style={{color:color}}
                            onClick={_onClickEdit}
                        >
                            edit
                        </button>
                        {completed && (
                            <button type="button"
                                className="todo-close flex-row align-c br-rounded"
                                title="delete todo"
                                onClick={_onClickDelete}
                            >
                                <IconClose stroke={color}/>
                            </button>
                        )}
                    </div>
                    <div className="todo-item_subheader flex-row align-c">
                        <p className="fs-text-s text-right">{stringDate}</p>
                    </div>
                    <div className="todo-item_body p-2">
                        <p className="fs-text">{todoData.text}</p>
                    </div>
                    {todoData.tags.length > 0 && (
                        <div className="todo-item_footer flex-row flex-wrap">
                            {todoData.tags.map((text) => (
                                <TagItem
                                    key={"tag-" + text}
                                    className="todo-tag"
                                    text={text}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="todo-item_right">
                    <button type="button"
                        title={completed ? "Non completed" : "Completed"}
                        style={{background: backgroundColor}}
                        className="todo-checkmark flex-row align-c"
                        onClick={onClickCheckmark}
                    >
                        {completed
                        ? <IconCheckmark stroke={"var(--c-transitive1)"}/>
                        : <IconCircle stroke={"var(--c-transitive1)"}/>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
