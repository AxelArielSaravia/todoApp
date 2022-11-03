/* -------------------------------------------------------------------------- */
/*                                ACTION TYPES                                */
/* -------------------------------------------------------------------------- */
const FILTERS_StatusChanged = "filters/statusFilterChanged";
const FILTERS_ColorChanged = "filters/colorFilterChanged";
const FILTERS_TagsChanged = "filters/tagsFilterChanged";

/* -------------------------------------------------------------------------- */
/*                              TYPES DEFINITION                              */
/* -------------------------------------------------------------------------- */
/*-
@type status: "Active" | "All" | "Completed";
@type FilterState: {
    colors: ["purple"?, "red"?, "green"?, "brown"?, "yellow"?, "blue"?, "pink"?],
    status: status,
    tags: Array<string>
}
@type colorChangeAction: {
    changeType: "add" | "delete",
    color: "purple" | "red" | "green" | "brown" | "yellow" | "blue" | "pink"
}
@type tagsChangeAction: {
    changeType: "add" | "delete",
    tag: Array<string>
}

@type filtersReducerAction: {
    type: FILTERS_StatusChanged
        | FILTERS_ColorChanged
        | FILTERS_TagsChanged,
    payload: undefined
        | status
        | colorChangeAction
        | tagsChangeAction,
}
*/

/* -------------------------------------------------------------------------- */
/*                                 INIT STATES                                */
/* -------------------------------------------------------------------------- */
/*-
initFiltersState: FilterState
*/
const initFiltersState = {
    colors: [],
    status: "All",
    tags: []
};

/* -------------------------------------------------------------------------- */
/*                                  REDUCERS                                  */
/* -------------------------------------------------------------------------- */
/*-
colorChange: (FilterState, colorChangeAction) -> FilterState
*/
function colorChange(state, action) {
    const arr = new Set(state.colors);
    if (action.changeType === "add") {
        arr.add(action.color);
    } else if (action.changeType === "delete") {
        arr.delete(action.color);
    }
    return {
        ...state,
        colors: [...arr]
    };
}

/*-
tagsChange: (FilterState, tagsChangeAction) -> FilterState
*/
function tagsChange(state, action) {
    const arr = new Set(state.tags);
    if (action.changeType === "add") {
        arr.add(action.tag);
    } else if (action.changeType === "delete") {
        arr.delete(action.tag);
    }
    return {
        ...state,
        tags: [...arr]
    };
}

/*-
filtersReducer: (FilterState, Action) -> FilterState
*/
function filtersReducer(state = initFiltersState, action) {
    const type = action.type;
    if (type === FILTERS_StatusChanged) {
        return {
            ...state,
            status: action.payload
        };
    }
    if (type === FILTERS_ColorChanged) {
        return colorChange(state, action.payload);
    }
    if (type === FILTERS_TagsChanged) {
        return tagsChange(state, action.payload);
    }
    return state;
}

export {
    filtersReducer
};