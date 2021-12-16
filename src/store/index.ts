import { createStore, applyMiddleware } from "redux";
import { createReduxHistoryContext } from "redux-first-history";
import { composeWithDevTools } from "redux-devtools-extension";
import { createHashHistory } from "history";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createHashHistory(),
  });

const store = createStore(
  createRootReducer(routerReducer),
  composeWithDevTools(applyMiddleware(routerMiddleware, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const history = createReduxHistory(store);

export { store as default, history };
