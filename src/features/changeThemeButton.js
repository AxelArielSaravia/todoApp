import useThemeChanger from "./useThemeChanger.js";
import {IconSunny, IconMoon} from "./icons/icons.js";

function ChangeThemeButton() {
    const [ theme, handleThemeChangerClick ] = useThemeChanger();
    return (
        <button
            className="change-theme flex-column justify-c br-rounded p-1"
            type="button"
            onClick={handleThemeChangerClick}
        >
            {theme === "dark"
                ? <IconSunny/>
                : <IconMoon/>
            }
        </button>
    );
}

export default Object.freeze(ChangeThemeButton);