import * as ActionList from './ActionsList';

import jwtdecode from 'jwt-decode';
import { toast } from 'react-toastify';

const SUCCESS = (msg) => {
  return toast.success(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
// const INFO = (msg) => {
//   return toast.info(msg, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
// };

const ERROR = (msg) => {
  return toast.error(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// export const IS_LOGGED_IN = (payload) => ({
//   type: ActionList.IS_LOGGED_IN,
// });

export const IS_LOGGED_OUT = (payload) => ({
  type: ActionList.IS_LOGGED_OUT,
});

// export const TOOGLE_PROFILE = (data) => (dispatch) => {

//   alert(data)

//   // dispatch({
//   //   type: 'User_login_pending',
//   //   payload: 'pending',
//   // });

// }


export const Get_All_POSTS = (payload) => ({
  type: ActionList.GET_ALLPOSTS,
  payload,
});

export const SET_City = (payload) => ({
  type: ActionList.SET_CITY_NAME,
  payload,
});

export const SET_LatLong = (payload) => ({
  type: ActionList.SET_LAT_LONG,
  payload,
});





export const TOOGLE_PROFILE = (payload) => ({
  type: ActionList.TOOGLE_PROFILE,
  payload,
});

export const LOGIN = (payload) => ({
  type: ActionList.USER_PROFILE,
  payload,
});

export const EMPTYSOTRE = (payload) => ({
  type: ActionList.EMPTY_STORE,
  payload: '',
});
