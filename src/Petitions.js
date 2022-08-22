import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Petition } from './Petition';
import { NavbarBottom } from './NavbarBottom';
import Spielplatz from './img/playground_petition.jpg';
import { ImageEndPoint } from './config/config';
import Parkbank from './img/bench.jpg';
import Sportplatz from './img/sportsfield.jpg';
import Radweg from './img/bikeway.jpg';
import ErrorService from './services/formatError/ErrorService';
import userServices from './services/httpService/userAuth/userServices';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Header from './components/Header';
import ReactGA from 'react-ga4';
import { useDispatch, useSelector } from 'react-redux';
import { Get_All_POSTS } from './reactStore/actions/Actions';

import Geocode from 'react-geocode';
import { mapAPiKey } from './config/config';
import { useDispatch, useSelector } from 'react-redux';
import { SET_City, SET_LatLong } from './reactStore/actions/Actions';
import { store } from './reactStore/MainStore';

export const Petitions = () => {
  const dispatch = useDispatch();
  Geocode.setApiKey(mapAPiKey);

  const [allPost, setallPost] = React.useState([]);
  const { locationName, lat, long } = useSelector((state) => state.Geo);

  //////const { allPost } = useSelector((state) => state.Posts);

  const [chunksPost, setchunksPost] = React.useState(0);

  // const [lat, setlat] = React.useState('');
  // const [long, setlong] = React.useState('');

  const [moreRefetch, setmoreRefetch] = React.useState(true);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       setlat(position.coords.latitude);
  //       setlong(position.coords.longitude);
  //       console.log(
  //         'geeoeoeoe',
  //         position.coords.latitude,
  //         position.coords.longitude
  //       );
  //     },
  //     function (error) {
  //       if (error.code == error.PERMISSION_DENIED) {
  //         setlat('false');
  //         setlong('false'); //

  //         console.log('denied');
  //       }
  //     }
  //   );
  // }, []);

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

  const getAllPosts = useQuery(
    'allpostdataPetitions',
    () =>
      userServices.commonGetService(
        `/post/getAllPost/${chunksPost}/${lat}/${long}`
      ),
    {
      enabled: lat == '' || long == '' ? false : true,
      refetchOnWindowFocus: false,
      refetchInterval: moreRefetch == true ? 500 : false,
      refetchIntervalInBackground: true,
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (res) => {
        console.log(
          '----------------------------------------------------',
          res.data.data
        );

        if (res.data.data == '') {
          setmoreRefetch(false);
        } else {
          setchunksPost(chunksPost + 1);

          for (let i = 0; i < res.data.data.length; i++) {
            //// console.log(res.data.data[i].upVote);

            if (res.data.data[i].upVote == undefined) {
              res.data.data[i].upVote = 0;
            }
            if (res.data.data[i].downVote == undefined) {
              res.data.data[i].downVote = 0;
            }
            if (res.data.data[i].bidder == undefined) {
              res.data.data[i].bidder = 0;
            }
          }

          ////let newData = (oldArray) => [...oldArray, ...res.data.data];

          ///////// dispatch(Get_All_POSTS(res.data.data));

          setallPost((oldArray) => [...oldArray, ...res.data.data]);
        }
      },
    }
  );

  function track() {
    ReactGA.initialize('G-L7KNR2MM11');
    ReactGA.send('/');
  }
  useEffect(() => {
    track();
  }, []);

  return (
    <div>
      {locationName != '' ? (
        <>
          {locationName != 'Köln' &&
            locationName != 'Cologne' &&
            locationName != 'Sargodha' ? (
            ///// {locationName != 'Köln' ? (
            <>
              <div id='header'>
                <p className='location' id='location'>
                  <Link to='/karte'>
                    {locationName}{' '}
                    <img id='filter' src={require('./img/funnel-fill.svg')} />{' '}
                  </Link>{' '}
                </p>
              </div>
              <div className='campaigns no-data statement-petitions'>
                Wir arbeiten noch nicht in dieser Region. Registrieren Sie sich{' '}
                <a style={{ color: 'blue' }} href='https://Lokalspende.org/'>
                  {' '}
                  hier{' '}
                </a>{' '}
                auf unserer Warteliste um zum Start in Ihrer Region
                benachrichtigt zu werden und den Start in Ihrer Region zu
                beschleunigen oder ändern Sie{' '}
                <a
                  style={{ color: 'blue' }}
                  href='https://app.lokalspende.org/karte'
                >
                  {' '}
                  hier{' '}
                </a>{' '}
                den Standort.
                <br />
                <br />
                Region in der wir arbeiten: <br /> <br />Köln
                <br />
                <br />
                Regionen auf der Warteliste: <br /><br /> 1. Aachen <br /> 2. Paris <br />
                3. Stuttgart <br />
                4. Rheinland-Pfalz <br /> 5. Ungarn <br />6. Nordrhein-Westfalen
              </div>
            </>
          ) : (
            <>
              <div id='header'>
                <p className='location' id='location'>
                  <Link to='/karte'>
                    {locationName}{' '}
                    <img id='filter' src={require('./img/funnel-fill.svg')} />{' '}
                  </Link>{' '}
                </p>

                <p className='menu1 small-headlines'>
                  {' '}
                  <Link className='strong' to='/'>
                    Anträge
                  </Link>{' '}
                  | <Link to='/crowdfunding'>Crowdfunding</Link>
                </p>
                <p className='menu2 small-headlines '>
                  {' '}
                  <Link to='/' className='strong'>
                    Aktiv{' '}
                  </Link>
                  |
                  <Link to='/antrage-akzeptiert' className=''>
                    {' '}
                    Akzeptiert{' '}
                  </Link>
                  |{' '}
                  <Link to='/antrage-abgelehnt' className=''>
                    Abgelehnt{' '}
                  </Link>{' '}
                </p>
                <p className='last-menu small-headlines'>
                  {' '}
                  <Link to='/' className='strong'>
                    Am nächsten{' '}
                  </Link>
                  |{' '}
                  <Link to='/antrage-aktiv-neuste' className=''>
                    {' '}
                    Neuste{' '}
                  </Link>
                  |{' '}
                  <Link to='/antrage-aktiv-am-beliebtesten' className=''>
                    {' '}
                    Beliebtest
                  </Link>{' '}
                </p>
              </div>

              <div className='campaigns'>
                {allPost.map((item) => (
                  <Petition item={item} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className='campaigns no-data statement-petitions'>
            Leider können wir Sie nicht automatisch orten. <br />
            Klicken Sie auf die Region die sie öffnen möchten. <br />
            <br />
            Region in der wir Arbeiten: <br /><br /> Köln
            <br />
            <br />
            Regionen auf der Warteliste: <br /><br />1. Aachen <br />2. Paris <br />
            3. Stuttgart <br />
            4. Rheinland-Pfalz <br />5. Ungarn <br />6. Nordrhein-Westfalen
            <br />
            <br />
            <a style={{ color: 'blue' }} href='https://Lokalspende.org/'>
              {' '}
              Hier{' '}
            </a>{' '}können Sie Ihre Region in der
            Warteliste eintragen.
          </div>
        </>
      )}

      {lat == '' ? (
        <>
          <div className='campaigns no-data'></div>
        </>
      ) : lat == 'false' ? (
        <>
          <div className='campaigns no-data statement-petitions'>
            Leider können wir Sie nicht automatisch orten.
            <br />
            Klicken Sie auf die Region die sie öffnen möchten. <br />
            <br />
            <br />
            Region in der wir Arbeiten: <br /> Köln
            <br />
            <br />
            Regionen auf der Warteliste: <br /> Aachen <br /> Paris <br />
            Stuttgart <br />
            Rheinland-Pfalz <br /> Ungarn <br /> Nordrhein-Westfalen
            <br />
            <br />
            <a style={{ color: 'blue' }} href='https://Lokalspende.org/'>
              {' '}
              Hier{' '}
            </a>{' '}können Sie Ihre Region in der
            Warteliste eintragen.
          </div>
        </>
      ) : null}

      <NavbarBottom
        classstart='under-navitem-selected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );
};
