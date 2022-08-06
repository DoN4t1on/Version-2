import * as ActionList from "./ActionsList";
import API from "../../API/API";
import { toast } from "react-toastify";

const SUCCESS = (msg) => {
  return toast.success(msg, {
    position: "top-right",
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
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const VENDOR_BUSINESS = (payload) => ({
  type: ActionList.BUSINESS_INFO,
  payload,
});

export const GET_BUSINESS_INFO = (id, callback) => {
  return async (dispatch) => {
    await API.get("/brand/vendor/" + id)
      .then((res) => {
        dispatch(VENDOR_BUSINESS(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const UPDATE_BUSINESS_INFO = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.put("/brand/information", data)
      .then((res) => {
        dispatch(GET_BUSINESS_INFO(data.id, callback));
        SUCCESS("Information is Updated!");
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};
export const UPDATE_HOURS = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.put("/brand/hours", data)
      .then((res) => {
        dispatch(GET_BUSINESS_INFO(data.id, callback));
        SUCCESS("Hours is Updated!");
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};
export const UPDATE_SERVICES = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.put("/brand/services", data)
      .then((res) => {
        dispatch(GET_BUSINESS_INFO(data.id, callback));
        SUCCESS("Services is Updated!");
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};
export const UPDATE_PAYMENTS = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.put("/brand/payment", data)
      .then((res) => {
        dispatch(GET_BUSINESS_INFO(data.id, callback));
        SUCCESS("Payment is Updated!");
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};
export const UPDATE_COVER = (data, callback, errorCb) => {
  return async (dispatch) => {
    await API.put("/brand/cover", data)
      .then((res) => {
        dispatch(GET_BUSINESS_INFO(data.id, callback));
        SUCCESS("Cover is Updated!");
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        errorCb();
      });
  };
};

export const RESTAURANTS = (payload) => ({
  type: ActionList.RESTAURANTS_LIST,
  payload,
});

export const GET_RESTAURANTS_LIST = (callback) => {
  return async (dispatch) => {
    await API.get("/brand/")
      .then((res) => {
        dispatch(RESTAURANTS(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};
export const GET_RESTAURANTS_LIST_BY_QUERY = (query, callback) => {
  return async (dispatch) => {
    await API.get("/brand/" + query)
      .then((res) => {
        dispatch(RESTAURANTS(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};

export const BRAND_DETAILS = (payload) => ({
  type: ActionList.BRAND,
  payload,
});

export const GET_BRAND_BY_ID = (id, callback) => {
  return async (dispatch) => {
    await API.get("/brand/" + id)
      .then((res) => {
        dispatch(BRAND_DETAILS(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          ERROR(error.response.data);
        } else if (error.request) {
          ERROR(error.request);
        } else {
          ERROR(error.message);
        }
        callback();
      });
  };
};
