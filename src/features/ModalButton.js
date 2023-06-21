function ModalButton({onClick, className, children}) {
    const _className = className ? className : "";
    return (
        <button
            type="button"
            className={_className + " flex-column align-c"}
            onClick={onClick}
        >
            { children }
        </button>
    );
}

export default Object.freeze(ModalButton);