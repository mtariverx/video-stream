import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import reducers from "../reducers";

export const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
export function configureStore(preloadedState) {
  const store = createStore(
    reducers(history),
    preloadedState,
    enhancer
    // compose(applyMiddleware(...middleware))
  );
  return store;
}
