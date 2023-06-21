import "./ColorItem.scss";

const colors = ["none", "blue", "purple", "pink", "red", "brown", "yellow", "green"];

function ColorItem({
    color,
    inputType,
    checked,
    onCheked,
    onNonCheked
}) {
    function changeColor (e) {
        if (e.currentTarget.checked) {
            onCheked(color);
        } else {
            onNonCheked(color);
        }
    }
    const checkedResult = checked(color);
    return (
        <label className="color p-2">
            <input
                className="hidden"
                type={inputType}
                value={color}
                checked={checkedResult}
                onClick={changeColor}
            />
            <div className={"color-item br-2 bc-" + color} title={color}></div>
        </label>
    );
}

function ColorsContainer({
    style,
    inputType,
    checked,
    onCheked,
    onNonCheked
}) {
    return (
        <form
            onSubmit={function (e) {e.preventDefault();}}
            className="flex-row flex-wrap align-c"
            style={style}
        >
            {colors.map((color) => (
                <ColorItem
                    key={"color-"+color}
                    inputType={inputType}
                    color={color}
                    checked={checked}
                    onCheked={onCheked}
                    onNonCheked={onNonCheked}
                />
            ))}
        </form>
    );
}

export default Object.freeze(ColorsContainer);