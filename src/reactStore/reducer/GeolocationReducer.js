import * as ActionList from '../actions/ActionsList';
const initialState = {
  isLoading: false,

  locationName: '',
  lat: '',
  long: '',
  manualLocation: false,
};
// eslint-disable-next-line
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.SET_CITY_NAME:
      return {
        ...state,

        locationName: payload.locationName,
        manualLocation: payload.manualLocation,
      };

    case ActionList.SET_LAT_LONG:
      return {
        ...state,

        lat: payload.lat,
        long: payload.long,
      };

    default:
      return state;
  }
};
