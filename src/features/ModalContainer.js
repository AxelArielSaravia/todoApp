import "./ModalContainer.scss";
function ModalContainer({className, children}) {
    const _className = className ? className + " modal-container p-3 br-2" : "modal-container p-3 br-2";
    return (
        <div className={_className}>{children}</div>
    );
}

export default Object.freeze(ModalContainer);