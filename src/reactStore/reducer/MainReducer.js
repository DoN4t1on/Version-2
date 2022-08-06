import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import PostReducer from './PostReducer';
import GeolocationReducer from './GeolocationReducer';


export default combineReducers({
  User: UserReducer,
  Posts: PostReducer,
  Geo: GeolocationReducer,
});
