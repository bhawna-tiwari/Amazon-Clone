import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; // ✅ Correct import
import rootreducers from "./components/redux/reducers/main";

const store = configureStore({
    reducer: rootreducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true, // Enables Redux DevTools
});

export default store;
