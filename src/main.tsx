import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import App from "./App";
import RootProvider from "./state/store";
import rootReducer from "./state/reducers";
import rootSaga from "./state/sagas";

const sagaMiddleware = createSagaMiddleware();

const serverData = window.__SERVER_DATA__;

const composeEnhancers = composeWithDevTools({
  name: "Redbook Inspect Blog"
});

const store = createStore(
  rootReducer,
  serverData,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export const main = () => {
  ReactDOM.hydrate(
    <RootProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RootProvider>,
    document.getElementById("root")
  );
};
