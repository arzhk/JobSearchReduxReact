import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import usersReducer from "../reducers/users";
import searchReducer from "../reducers/search";
import errorsReducer from "../reducers/errors";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  user: {
    username: "",
    favourites: [],
    recentSearches: [],
    _id: "",
  },
  search: {
    searchResults: [],
    selectedJob: [],
  },
  errors: {
    show: false,
    errors: [],
  },
};

const reducerMerge = combineReducers({ user: usersReducer, search: searchReducer, errors: errorsReducer });

export default function configureStore() {
  return createStore(
    reducerMerge,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
