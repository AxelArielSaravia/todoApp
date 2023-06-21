import {useReducer} from "react";
import {useSelector} from "react-redux";

import {IconAdd, IconOptions} from "./features/icons/icons.js";

import TodoItem from "./features/todos/TodoItem.js";
import ModalButton from "./features/ModalButton.js";
import ChangeThemeButton from "./features/changeThemeButton.js";
import FilterConfig from "./features/filter/FilterConfig.js";
import AddTodoItem from "./features/todos/AddTodoItem.js";
import EditTodoItem from "./features/todos/EditTodoItem.js";
import "./App.scss";

function selectTodosIDs(state) {
    const filters = state.filters;
    const todos = state.todos;
    let statusFilter;
    if (filters.status === "Active") {
        statusFilter = Object.keys(todos).filter(
            (key) => !todos[key].completed
        );
    } else if (filters.status === "Completed") {
        statusFilter = Object.keys(todos).filter(
            (key) => todos[key].completed
        );
    } else {
        statusFilter = Object.keys(todos);
    }
    if (filters.colors.length > 0) {
        statusFilter = statusFilter.filter(
            (key) => filters.colors.includes(todos[key].color)
        );
    }
    if (filters.tags.length > 0) {
        statusFilter = statusFilter.filter(function (key) {
            filters.tags.forEach(function (tag) {
                if (todos[key].tags.includes(tag)) {
                    return true;
                }
            });
            return false;
        });
    }
    return statusFilter.reverse();
}

const initModal = {
    id: "",
    type: "",
    value: false
};

function modalReducer(state = initModal, action) {
    const type = action.type;
    if (type === "modal/filterConfig") {
        return {
            value: true,
            type: "FILTER_CONFIG",
            id: ""
        };
    }
    if (type === "modal/addTodo") {
        return {
            value: true, type: "ADD_TODO",
            id: ""
        };
    }
    if (type === "modal/editTodo") {
        return {
            value: true,
            type: "EDIT_TODO",
            id: action.payload
        };
    }
    if (type === "modal/close") {
        return initModal;
    }
    return state;
}

function AsideContent({type, closeModal, active, id}) {
    if (type === "FILTER_CONFIG") {
        return <FilterConfig active={active} closeModal={closeModal} />;
    }
    if (type === "ADD_TODO") {
        return  <AddTodoItem closeModal={closeModal} />;
    }
    if (type === "EDIT_TODO") {
        return  <EditTodoItem closeModal={closeModal} id={id} />;
    }
    return null;
}

function TodoItems({setModal}) {
    const todosIds = useSelector(selectTodosIDs);

    return todosIds.map((id) => (
        <TodoItem key={id} id={id} setModal={setModal} />
    ));
}

function Modal({modal, closeModal}) {
    if (!modal.value) {return;}
    return (
        <aside className="flex-column align-c justify-c" >
            <AsideContent
                type={modal.type}
                closeModal={closeModal}
                active={modal.value}
                id={modal.id}
            />
        </aside>
    );
}

function App() {
    const [modal, setModal] = useReducer(modalReducer, initModal);

    function closeModal() {
        setModal({type: "modal/close"});
    }
    function filterConfigModalOnClick() {
        setModal({type: "modal/filterConfig"});
    }
    function addTodoModalOnClick() {
        setModal({type: "modal/addTodo"});
    }

    return (
        <>
            <header className="p-3 flex-row align-c justify-sb">
                <ModalButton
                    onClick={filterConfigModalOnClick}
                    className="config br-2 p-1"
                >
                    <IconOptions />
                </ModalButton>
                <ModalButton
                    onClick={addTodoModalOnClick}
                    className="add-todo br-2 p-1"
                >
                    <h1 className="flex-row align-c">
                        <IconAdd title="Add Todo"/>
                    </h1>
                </ModalButton>
                <ChangeThemeButton />
            </header>
            <Modal
                modal={modal}
                closeModal={closeModal}
            />
            <main className="todos-container flex-grow-1 p-2">
                <TodoItems setModal={setModal}/>
            </main>
            <footer>
                <p className="fs-text-s text-center">
                by{" "}
                    <a
                        className="fs-text-s text-center"
                        href="https://github.com/AxelArielSaravia/"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Axel Ariel Saravia
                    </a>
                </p>
            </footer>
        </>
    );
}

export default App;
