import { combineReducers } from "redux";
import testReducer from "./testReducer";
import headerTitleReducer from "./headerTitleReducer";

const reducers = combineReducers({
  test: testReducer,
  headerTitle: headerTitleReducer,
});

export default reducers;
