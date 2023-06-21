import {useCallback, useEffect} from "react";

function useOnClickClose(elementActive, matcher, closeFunction) {
    const matches = useCallback(function matches(e) {
        if (!e.target.matches(matcher)) {
            closeFunction();
        }
    }, [matcher, closeFunction]);

    useEffect(function () {
        if (elementActive) {
            setTimeout(function () {
                document.addEventListener("click", matches);
            });
            return function () {
                document.removeEventListener("click", matches);
            };
        }
    }, [elementActive, matches]);
}

export default Object.freeze(useOnClickClose);
