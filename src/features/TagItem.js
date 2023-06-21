import "./TagItem.scss";
function TagItem({className, text, children}) {
    const _className = className ? className : "";
    return (
        <div
            className={"tag br-2 " + _className}
            title={"tag: " + text}
        >
            {children}
            <span className="fs-text-s">{text}</span>
        </div>
    );
}

export default Object.freeze(TagItem);