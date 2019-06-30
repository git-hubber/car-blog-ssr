import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { END, Saga, Task } from "redux-saga";

import rootReducer from "../src/state/reducers";

export default function configureStore(initialState: any) {
  const sagaMiddleware = createSagaMiddleware();
  interface ConfigStore extends Store {
    runSaga<S extends Saga>(saga: S, ...args: Parameters<S>): Task;
    close: () => END;
  }
  const store: any = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  // // Enable Webpack hot module replacement for reducers
  // (module as any).hot.accept("../src/state/reducers", () => {
  //   const nextRootReducer = require("../src/state/reducers").default;
  //   store.replaceReducer(nextRootReducer);
  // });

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store as ConfigStore;
}
