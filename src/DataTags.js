/*-
@type TagItem <a>: {
    name: <a>,
    repeat: number
}
@type AllTags <a>: {
    <a>: TagItem<a>,
    ...
}
*/
/*-
initTagsData: undefined -> AllTags<string>
*/
// Read the localStorage item "all_tags" and return the values or {}
// if the item is null or have an error
function initTagsData() {
    try {
        const allTags = JSON.parse(localStorage.getItem("all_tags"));
        if (allTags != null) {
            return allTags;
        } else {
            localStorage.setItem("all_tags", JSON.stringify({}));
            return {};
        }
    } catch {
        return {};
    }
}

/*-
createTagItem: string -> TagItem<string>
*/
function createTagItem(tag) {
    return {
        name: tag,
        repeated: 1
    };
}

const DATA_TAGS = initTagsData();

/*-
addTagToDataTags: string -> undefined
*/
//Change te value of the localStorage's item "all_tags"
function addTagToDataTags(tag) {
    if (typeof tag === "string") {
        if (DATA_TAGS[tag] != null) {
            DATA_TAGS[tag].repeated += 1;
        } else {
            DATA_TAGS[tag] = createTagItem(tag);
        }
        localStorage.setItem("all_tags", JSON.stringify(DATA_TAGS));
    }
}

function deleteTagFromDataTags(tag, toLocalStorage = false) {
    if (typeof tag === "string" && DATA_TAGS[tag] != null) {
        if (DATA_TAGS[tag].repeated > 1) {
            DATA_TAGS[tag].repeated -= 1;
        } else {
            delete DATA_TAGS[tag];
        }
    }
    if (typeof toLocalStorage === "boolean" && toLocalStorage) {
        localStorage.setItem("all_tags", JSON.stringify(DATA_TAGS));
    }
}


function deleteTagsFromDataTags(tags) {
    tags.forEach((tag) => deleteTagFromDataTags(tag));
    localStorage.setItem("all_tags", JSON.stringify(DATA_TAGS));
}

export default DATA_TAGS;
export {
    addTagToDataTags,
    deleteTagFromDataTags,
    deleteTagsFromDataTags
};