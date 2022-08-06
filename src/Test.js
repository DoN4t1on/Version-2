import { useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import AppleSignin from 'react-apple-signin-auth';

export default function Test() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'key',
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  console.log(selected);

  return (
    <>
      <div className='places-container'>
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <div className='my-3'>
        <AppleSignin
          /** Auth options passed to AppleID.auth.init() */
          authOptions={{
            /** Client ID - eg: 'com.example.com' */
            clientId: 'com.example.web',
            /** Requested scopes, seperated by spaces - eg: 'email name' */
            scope: 'email name',
            /** Apple's redirectURI - must be one of the URIs you added to the serviceID - the undocumented trick in apple docs is that you should call auth from a page that is listed as a redirectURI, localhost fails */
            redirectURI: 'https://example.com',
            /** State string that is returned with the apple response */
            state: 'state',
            /** Nonce */
            nonce: 'nonce',
            /** Uses popup auth instead of redirection */
            //   usePopup: ${authOptions.usePopup},
          }} // REQUIRED
          /** General props */
          uiType='dark'
          /** className */
          className='btn-social btn-apple shadow-sm'
          /** Removes default style tag */
          noDefaultStyle={false}
          /** Allows to change the button's children, eg: for changing the button text */
          buttonExtraChildren='Weiter mit Apple'
          /** Extra controlling props */
          /** Called upon signin success in case authOptions.usePopup = true -- which means auth is handled client side */
          onSuccess={(response) => console.log(response)} // default = undefined
          /** Called upon signin error */
          onError={(error) => console.error(error)} // default = undefined
          /** Skips loading the apple script if true */
          skipScript={false} // default = undefined
          /** Apple image props */
          iconProp={{ style: { marginTop: '10px' } }} // default = undefined
          /** render function - called with all props - can be used to fully customize the UI by rendering your own component  */
          render={(props) => (
            <button className='btn-social btn-apple shadow-sm' {...props}>
              <i className='fab fa-apple text-white '></i>
              <span className='mx-2 text-white'> Weiter mit Apple</span>
            </button>
          )}
        />
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        mapContainerClassName='map-container'
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className='combobox-input'
        placeholder='Search an address'
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
