// src/store.js or wherever your store is located

import { configureStore } from "@reduxjs/toolkit";
import rootreducers from "./components/redux/reducers/main";

const store = configureStore({
  reducer: rootreducers,
  devTools: true, // optional, enabled by default in development
});

export default store;
