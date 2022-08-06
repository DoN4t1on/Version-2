import * as ActionList from "../actions/ActionsList";
const initialState = {
  business_info: null,
  restaurants_list: [],
  brand: null,
};
// eslint-disable-next-line
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.BUSINESS_INFO:
      return { ...state, business_info: payload };
    case ActionList.RESTAURANTS_LIST:
      return { ...state, restaurants_list: payload };
    case ActionList.BRAND:
      return { ...state, brand: payload };
    default:
      return state;
  }
};
