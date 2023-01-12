import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Geocode from 'react-geocode';
import { mapAPiKey } from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { SET_City, SET_LatLong } from '../../reactStore/actions/Actions';
import { store } from '../../reactStore/MainStore';
function Header() {

  const dispatch = useDispatch();
  /////const [locationName, setlocationName] = useState('Standort');
  Geocode.setApiKey(mapAPiKey);

  const { locationName, manualLocation } = useSelector((state) => state.Geo);

  useEffect(() => {
    if (store.getState().Geo.manualLocation == false) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let payload = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };

        dispatch(SET_LatLong(payload));

        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
          /// 50.9697143,
          //6.9679737
        ).then(
          (response) => {
            var city = '';
            var state = '';
            var country = '';
            var zipcode = '';

            var address_components = response.results[0].address_components;

            for (var i = 0; i < address_components.length; i++) {
              if (
                address_components[i].types[0] ===
                'administrative_area_level_1' &&
                address_components[i].types[1] === 'political'
              ) {
                state = address_components[i].long_name;
              }
              if (
                address_components[i].types[0] === 'locality' &&
                address_components[i].types[1] === 'political'
              ) {
                city = address_components[i].long_name;
              }

              if (
                address_components[i].types[0] === 'postal_code' &&
                zipcode == ''
              ) {
                zipcode = address_components[i].long_name;
              }

              if (address_components[i].types[0] === 'country') {
                country = address_components[i].long_name;
              }
            }

            ///// const address = response.results[0].formatted_address;

            dispatch(SET_City({ locationName: city, manualLocation: false }));
            ///  setlocationName(city);
          },
          (error) => {
            console.error(error);

            /// dispatch(SET_City('Standort'));
            // dispatch(
            //   SET_City({ locationName: 'Standort', manualLocation: false })
            // );

            let payload = {
              lat: 'false',
              long: 'false',
            };

            dispatch(SET_LatLong(payload));
          }
        );

        ///   console.log('Latitude is :', position.coords.latitude);
        ///console.log('Longitude is :', position.coords.longitude);
      });
    }
  }, []);

  return (
    <div>
      <div id='header'>
        <p className='location' id='location'>
        {' '}
          <img class='location-icon' src={require('../../img/geo-alt-fill.svg')} />{' '}
          {' '}
          Köln
        </p>

        <p className='menu1 small-headlines'>
          {' '}
          <Link
            className={window.location.pathname == '/' ? 'strong' : ''}
            to='/'
          >
            Anträge
          </Link>{' '}
          |{' '}
          <Link
            to='/crowdfunding'
            className={
              window.location.pathname == '/crowdfunding' ? 'strong' : ''
            }
          >
            Crowdfunding
          </Link>
        </p>
        <p className='menu2 small-headlines '>
          {' '}
          <Link
            to='/'
            className={window.location.pathname == '/' ? 'strong' : ''}
          >
            Aktiv{' '}
          </Link>
          |
          <Link
            to='/antrage-akzeptiert'
            className={
              window.location.pathname == '/antrage-akzeptiert'
                ? 'strong'
                : ''
            }
          >
            {' '}
            Akzeptiert{' '}
          </Link>
          |{' '}
          <Link
            to='/antrage-abgelehnt'
            className={
              window.location.pathname == '/antrage-abgelehnt'
                ? 'strong'
                : ''
            }
          >
            Abgelehnt{' '}
          </Link>{' '}
        </p>
        <p className='last-menu small-headlines'>
          {' '}
          <Link
            to='/'
            className={window.location.pathname == '/' ? 'strong' : ''}
          >
            Am nächsten{' '}
          </Link>
          |{' '}
          <Link
            to='/antrage-aktiv-neuste'
            className={
              window.location.pathname == '/antrage-aktiv-neuste'
                ? 'strong'
                : ''
            }
          >
            {' '}
            Neuste{' '}
          </Link>
          |{' '}
          <Link
            to='/antrage-aktiv-am-beliebtesten'
            className={
              window.location.pathname == '/antrage-aktiv-am-beliebtesten'
                ? 'strong'
                : ''
            }
          >
            {' '}
            Beliebtest
          </Link>{' '}
        </p>
      </div>
    </div>
  );
}

export default Header;
