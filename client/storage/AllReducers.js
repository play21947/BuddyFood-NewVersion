import { combineReducers } from "redux";
import AuthenticationReducer from "./reducers/AuthenticationReducer";
import CartReducer from "./reducers/CartReducer";

const AllReducers = combineReducers({
    auth: AuthenticationReducer,
    cart: CartReducer
})


export default AllReducers