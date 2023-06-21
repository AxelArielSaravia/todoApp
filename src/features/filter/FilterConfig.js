import {useDispatch, useSelector} from "react-redux";
import useOnClickClose from "../useOnClickClose.js";

import DataTagInput from "../DataTagInput.js";
import ColorsContainer from "../ColorItem.js";
import TagModalContainer from "../TagModal.js";
import ModalContainer from "../ModalContainer.js";

import "./FilterConfig.scss";

function selectFilter(state) {return state.filters;}

function FilterConfig({active, closeModal}) {
    const {colors, status, tags} = useSelector(selectFilter);
    const dispatch = useDispatch();

    useOnClickClose(active, "aside *", closeModal);

    function colorCheck(color) {return colors.includes(color);}
    function deleteTag(tag) {
        return dispatch({
            type: "filters/tagsFilterChanged",
            payload: {changeType: "delete",tag}
        });
    }
    function changeStatus(payload) {
        dispatch({type: "filters/statusFilterChanged", payload});
    }
    function changeColorAdd(color) {
        dispatch({
            type: "filters/colorFilterChanged",
            payload: {changeType:"add", color}
        });
    }
    function changeColorDelete(color) {
        dispatch({
            type: "filters/colorFilterChanged",
            payload: {changeType:"delete", color}
        });
    }
    function addTag(tag) {
        dispatch({type: "filters/tagsFilterChanged", payload: {changeType: "add", tag}});
    }
    function selectAllAsCompleted() {
        dispatch({type: "todos/allCompleted"});
    }
    function clearCompleted() {
        dispatch({type: "todos/completedCleared"});
    }

    return (
        <ModalContainer className="filter-config">
            <button
                className="close flex-column align-c br-2"
                type="button"
                onClick={closeModal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="icon" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                </svg>
            </button>
            <div className="p-2">
                <h3 className="fs-text-l">Actions</h3>
            </div>
            <div className="flex-row flex-wrap align-c justify-c p-3">
                <button
                    type="button"
                    className="action-button m-2 p-2 br-2 fs-text"
                    onClick={selectAllAsCompleted}
                >
                    Mark All As completed
                </button>
                <button
                    type="button"
                    className="action-button m-2 p-2 br-2 fs-text"
                    onClick={clearCompleted}
                >
                    Clean Completed
                </button>
            </div>
            <div className="p-2">
                <h3 className="fs-text-l">Filter by</h3>
            </div>
            <div className="flex-row align-c p-3">
                <h4 className="fs-text flex-grow-1">Status: </h4>
                <label className="filterConfig-status flex-grow-1 p-2">
                    <input
                        className="hidden"
                        type="radio"
                        value="All"
                        onClick={function () {changeStatus("All");}}
                        checked={status === "All"}
                    />
                    <p className="fs-text text-center p-2 br-2" title="All">All</p>
                </label>
                <label className="filterConfig-status flex-grow-1">
                    <input
                        className="hidden"
                        type="radio"
                        value="Active"
                        onClick={function () {changeStatus("Active");}}
                        checked={status === "Active"}
                    />
                    <p className="fs-text text-center p-2 br-2" title="Active">Active</p>
                </label>
                <label className="filterConfig-status flex-grow-1">
                    <input
                        className="hidden"
                        type="radio"
                        value="Completed"
                        onClick={function () {changeStatus("Completed");}}
                        checked={status === "Completed"}
                    />
                    <p className="fs-text text-center p-2 br-2" title="Completed">Completed</p>
                </label>
            </div>
            <div className="flex-row align-c p-3">
                <h4 className="fs-text" style={{width: "25%"}}> Colors: </h4>
                <ColorsContainer
                    inputType="checkbox"
                    checked={colorCheck}
                    onCheked={changeColorAdd}
                    onNonCheked={changeColorDelete}
                />
            </div>
            <div>
                <div className="flex-row align-c p-3">
                    <h4 className="fs-text" style={{width:"20%"}}>Tag: </h4>
                    <DataTagInput
                        style={{width: "70%"}}
                        addTag={addTag}
                    />
                </div>
                <TagModalContainer
                    tags={tags}
                    deleteTag={deleteTag}
                />
            </div>
        </ModalContainer>
    );
}

export default Object.freeze(FilterConfig);
