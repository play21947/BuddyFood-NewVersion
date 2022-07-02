import { combineReducers } from "redux";
import AuthenticationReducer from "./reducers/AuthenticationReducer";

const AllReducers = combineReducers({
    auth: AuthenticationReducer
})


export default AllReducers