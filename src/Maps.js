import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from 'react-google-maps';
import { mapAPiKey } from './config/config';
import RoomIcon from '@mui/icons-material/Room';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import Geocode from 'react-geocode';
import { useDispatch, useSelector } from 'react-redux';
const MarkerIcon = (props) => {
  return (
    <>
      <RoomIcon
        id='output'
        sx={{ overflow: 'hidden', fontSize: 48, color: '#fa3305' }}
      />
    </>
  );
};

function Maps(props) {
  Geocode.setApiKey(mapAPiKey);

  const { lat, long } = useSelector((state) => state.Geo);

  const [center, setCenter] = useState({ lat: lat, lng: long });

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     setCenter({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     }),
  //       (error) => {
  //         console.error(error);
  //       };

  //     ///   console.log('Latitude is :', position.coords.latitude);
  //     ///console.log('Longitude is :', position.coords.longitude);
  //   });
  // }, []);

  // const [latlong, setlatlong] = useState({ lat: 40.856795, lng: -73.954298 });

  const mapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
  };

  const refMap = useRef(null);

  const handleBoundsChanged = () => {
    const mapCenter = refMap.current.getCenter(); //get map center

    const newCenter = refMap.current.getCenter().toJSON();

    console.log(newCenter);

    props.setlat(newCenter.lat);
    props.setlong(newCenter.lng);

    console.log(mapCenter);

    setCenter(mapCenter);

    Geocode.fromLatLng(newCenter.lat, newCenter.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        props.setlocationName(address);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
  });
  const handleInput = (e) => {
    setValue(e.target.value);
    //  props.setaddress(value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter as "false"

      console.log('value=', description);
      setValue(description, false);

      clearSuggestions();

      //      props.setaddress(description);

      //// props.changeaddress(description);
      //////props.formik.setFieldValue('address', description);

      // console.log('address=', props.address);
      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          let newcor = { lat: lat, lng: lng };

          setCenter(newcor);

          // props.setCordinates(newcor);

          // props.setlong(lng);
          // props.setlat(lat);
          console.log('Coordinates: ', { lat, lng });
        })
        .catch((error) => {
          console.log('😱 Error: ', error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          // className='cursor-pointer hover:text-red-500'
          style={{ display: 'block' }}
          key={id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  let iconMarker = new window.google.maps.MarkerImage(
    'https://lh3.googleusercontent.com/bECXZ2YW3j0yIEBVo92ECVqlnlbX9ldYNGrCe0Kr4VGPq-vJ9Xncwvl16uvosukVXPfV=w300',
    null /* size is determined at runtime */,
    null /* origin is 0,0 */,
    null /* anchor is bottom center of the scaled image */,
    new window.google.maps.Size(52, 52)
  );
  return (
    <>
      {/* <input
        class='	input-styl px-2 py-2 h-12 rounded-3xl'
        placeholder='Location'
        value={value}
        onChange={handleInput}
        disabled={!ready}
      /> */}
      <div className='mt absolute z-40'>
        {status === 'OK' && (
          <ul className='bg-white p-2 w-full    shadow-lg'>
            {renderSuggestions()}
          </ul>
        )}
      </div>
      <br></br> <br></br>
      <GoogleMap
        ref={refMap}
        defaultZoom={13}
        defaultCenter={center}
        defaultAverageCenter={true}
        defaultOptions={mapOptions}
        onBoundsChanged={handleBoundsChanged}
      >
        <Marker
          icon={{
            url: require('./img/marker1.png'),

            anchor: new google.maps.Point(27, 56),

            scaledSize: new google.maps.Size(30, 45),
          }}
          position={center}
        />
      </GoogleMap>
    </>
  );
}

export default withScriptjs(withGoogleMap(Maps));
