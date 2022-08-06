import * as ActionList from '../actions/ActionsList';
const initialState = {
  IS_LOGGED: false,

  profile: null,
};
// eslint-disable-next-line
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.IS_LOGGED_OUT:
      return { ...state, IS_LOGGED: false };

    case ActionList.USER_PROFILE:
      return { ...state, profile: payload, IS_LOGGED: true };

    case ActionList.EMPTY_STORE:
      return {
        IS_LOGGED: false,

        currentName: null,
        rememberMe: null,
        currentPic: null,

        ////// TOKEN: null,
        profile: null,
        IsCognito: false,
      };

    default:
      return state;
  }
};
