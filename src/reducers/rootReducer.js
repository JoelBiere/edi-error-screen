import { combineReducers } from "redux";
import { cardsReducer, alertsReducer } from "./reducers";


 const rootReducer = combineReducers({
    cardsReducer,
    alertsReducer
})

export default rootReducer