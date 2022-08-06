import * as ActionList from '../actions/ActionsList';
const initialState = {
  isLoading: false,

  allPost: [],
};
// eslint-disable-next-line
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.GET_ALLPOSTS:
      return {
        isLoading: false,

        allPost: state.allPost.concat(payload),
      };

    default:
      return state;
  }
};
