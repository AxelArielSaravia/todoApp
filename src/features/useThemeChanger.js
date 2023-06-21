import {useEffect, useState} from "react";

function useThemeChanger() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") !== null
        ? localStorage.getItem("theme")
        : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

    useEffect(function () {
        if (theme === "dark") {
            document.body.className = "dark";
        } else {
            document.body.className = "light";
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    function handleThemeChangerClick() {
        setTheme(function (state) {
            return (state === "dark" ? "light" : "dark");
        });
    }

    return [theme, handleThemeChangerClick];
}

export default Object.freeze(useThemeChanger);