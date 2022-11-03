import {useState} from "react";
import {addTagToDataTags, deleteTagFromDataTags} from "../../DataTags.js";
import ModalContainer from "../ModalContainer.js";
import ColorsContainer from "../ColorItem.js";
import DataTagInput from "../DataTagInput.js";
import TagModalContainer from "../TagModal.js";
import {IconClose, IconCheckmark} from "../icons/icons.js";

import "./ConfigTodoItem.scss";

export default function ConfigTodoItem({
    closeModal,
    setTodo,
    text = "",
    color = "none",
    tags = [],
    editDate
}) {
    const [_text, _setText] = useState(text);
    const [isRequired, setIsRequired] = useState(false);
    const [_color, _setColor] = useState(color);
    const [_tags, _setTags] = useState(tags);
    const [dateNow, setDateNow] = useState(false);

    function changeText(e) {
        if (isRequired) {
            setIsRequired(function () {return false;});
        }
        _setText(() => e.target.value);
    }
    function onCheckedColor(color_) {
        _setColor(function () {return color_;});
    }
    function onNonChekedColor() {
        _setColor(function () {return "none";});
    }
    function checkColor(color_) {
        return _color === color_;
    }
    function addTag(tag_) {
        if (_tags.includes(tag_)) {return;}
        addTagToDataTags(tag_);
        _setTags(function (state) {return [...state, tag_];});
    }
    function deleteTag(tag) {
        deleteTagFromDataTags(tag, true);
        _setTags(function (tags_) {
            return tags_.filter(function (_tag) {return _tag !== tag;});
        });
    }

    function addTodo() {
        if (_text !== "") {
            setTodo(_text, _color, _tags, dateNow);
            closeModal();
        } else {
            setIsRequired(() => true);
        }
    }
    const todoTextClass = isRequired ? "todo-text p-3 fs-text required" : "todo-text p-3 fs-text";
    return (
        <ModalContainer className="config-todoItem">
            <div className="p-2">
                <h3 className="fs-text-l">New Todo</h3>
            </div>
            <div className="flex-column p-3">
                <h4 className="fs-text p-2">What do you need to do?</h4>
                <textarea
                    className={todoTextClass}
                    value={_text}
                    onChange={changeText}
                    rows="2"
                    required
                />
            </div>
            {editDate && (
                <div className="flex-row align-c p-3">
                    <h4 className="fs-text">Set date to now: </h4>
                    <label className="editDate-button p-2">
                        <input
                            className="hidden"
                            type="radio"
                            value={false}
                            checked={!dateNow}
                            onChange={() => setDateNow(() => false)}
                        />
                        <p className="fs-text p-2 br-2">No</p>
                    </label>
                    <label className="editDate-button p-2">
                        <input
                            className="hidden"
                            type="radio"
                            value={true}
                            checked={dateNow}
                            onChange={() => setDateNow(() => true)}
                        />
                        <p className="fs-text p-2 br-2">Yes</p>
                    </label>
                </div>
            )}
            <div className="flex-row align-c p-3">
                <h4 className="fs-text">Select Color:</h4>
                <ColorsContainer
                    inputType="radio"
                    checked={checkColor}
                    onCheked={onCheckedColor}
                    onNonCheked={onNonChekedColor}
                />
            </div>
            <div>
                <div className="flex-row align-c p-3">
                    <h4 className="fs-text" style={{width: "20%"}}>Tags:</h4>
                    <DataTagInput addTag={addTag} addButton style={{width: "70%"}}/>
                </div>
                <TagModalContainer tags={_tags} deleteTag={deleteTag}/>
            </div>
            <div className="flex-row justify-c p-2">
                <button
                    className="confirm-button flex-row align-c m-2 p-2 br-2 fs-text-l"
                    type="button"
                    onClick={closeModal}
                    title="Cancel"
                >
                    <IconClose/>
                </button>
                <div className="m-3"></div>
                <button
                    className="confirm-button flex-row align-c m-2 p-2 br-2 fs-text-l"
                    type="button"
                    onClick={addTodo}
                    title="add todo"
                >
                    <IconCheckmark/>
                </button>
            </div>
        </ModalContainer>
    );
}