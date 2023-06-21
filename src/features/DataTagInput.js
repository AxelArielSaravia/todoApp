import {useState} from "react";

import DATA_TAGS from "../DataTags.js";

import "./DataTagInput.scss";

const width100 = {width: "100%"};

function onClickPosibleTag({addTag, tag, setSelectTags, setTag}) {
    addTag(tag.trim());
    setSelectTags(() => []);
    setTag(() => "");
}

function SelectTags({selectTagsState, addTag, setTag}) {
    const {selectTags, setSelectTags} = selectTagsState;

    if (!(selectTags.length > 0)) {return;}

    return (
        <div
            className="select-tag p-2 br-2 flex-row flex-wrap align-c justify-c"
            style={{width: "100%"}}
        >
            {selectTags.map((tag) => (
                <button
                    key={"select-" + tag}
                    type="button"
                    className="posible-tag p-2"
                    onClick={() => onClickPosibleTag({
                        tag,
                        addTag,
                        setSelectTags,
                        setTag
                    })}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}

function AddButton({
    addButton
}) {
    if (!addButton) {return;}

    return (
        <button
            className="data-tag_button br-2 p-2"
            type="submit"
        >
            add
        </button>
    );
}

function DataTagInput({addTag, addButton}) {
    const [_tag, _setTag] = useState("");
    const [selectTags, setSelectTags] = useState([]);

    function onChangeFilterTag(e) {
        const value = e.target.value.toLocaleLowerCase();
        if (value !== "") {
            const filter = Object.keys(DATA_TAGS).filter(function (tag) {
                const re = new RegExp(value);
                return re.test(tag);
            });
            setSelectTags(() => filter);
        } else {
            setSelectTags(() => []);
        }
        _setTag(() => value);
    }
    function submitHandle(e) {
        e.preventDefault();
        onClickPosibleTag({
            tag: _tag,
            addTag,
            setSelectTags,
            setTag: _setTag
        });
    }

    return (
        <form onSubmit={submitHandle} className="flex-row align-c" style={width100}>
            <div className="data-tag" style={width100}>
                <input
                    style={width100}
                    className="p-2"
                    type="text"
                    placeholder="add a tag"
                    value={_tag}
                    onChange={onChangeFilterTag}
                />
                <SelectTags
                    selectTagsState={{selectTags, setSelectTags}}
                    addTag={addTag}
                    setTag={_setTag}
                />
            </div>
            <AddButton
                addButton={addButton}
            />
        </form>
    );
}

export default Object.freeze(DataTagInput);