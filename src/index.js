import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import App from "./App";
import "./index.css";
import rootReducer from "./store.js";

const container = document.getElementById("root");
const root = createRoot(container);


{
    const appVersion = localStorage.getItem("version");
    if (appVersion !== "v0.0.3") {
        localStorage.clear();
        localStorage.setItem("version", "v0.0.3");
    }
}

root.render(
    <Provider store={rootReducer}>
        <App />
    </Provider>
);