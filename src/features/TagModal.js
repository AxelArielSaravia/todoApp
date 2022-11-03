import {memo} from "react";

import TagItem from "./TagItem.js";
import {IconClose} from "./icons/icons.js";

import "./TagModal.scss";

const TagModal = memo(function TagModal({tag, deleteTag}) {
    const onClick = () => deleteTag(tag);
    return (
        <TagItem
            className="config-tag m-3"
            text={tag}
        >
            <button
                type="button"
                className="tag-close flex-column align-c br-rounded"
                onClick={onClick}
            >
                <IconClose/>
            </button>
        </TagItem>
    );
});

function TagModalContainer({tags, deleteTag}) {
    return (
        <div className="tags-container flex-row flex-wrap align-c justify-c">
            {tags.map((tag) => (
                <TagModal
                    key={`tag-${tag}`}
                    tag={tag}
                    deleteTag={deleteTag}
                />
            ))}
        </div>
    );
}

export default Object.freeze(TagModalContainer);
export {
    TagModal
};