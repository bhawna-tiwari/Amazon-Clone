import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import Contextprovider from "./components/context/Contextprovider";
import { BrowserRouter } from "react-router-dom";
import "../src/index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(
  <Contextprovider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Contextprovider>
  ,
  document.getElementById('root')
);
