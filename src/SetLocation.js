import { NavbarBottom } from './NavbarBottom';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import WrappedMap from './Maps';
import { mapAPiKey } from './config/config';
import { useDispatch, useSelector } from 'react-redux';
import { SET_City, SET_LatLong } from './reactStore/actions/Actions';

import TextField from '@mui/material/TextField';

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

import Address from './Address';

import { localStorageData, Logout } from './services/auth/localStorageData';
import IconButton from '@mui/material/IconButton';
import RoomIcon from '@mui/icons-material/Room';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ErrorService from './services/formatError/ErrorService';
import userServices from './services/httpService/userAuth/userServices';
import GoogleMapReact from 'google-map-react';
import { useFormik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Geocode from 'react-geocode';
import * as Yup from 'yup';
const Input = styled('input')({
  display: 'none',
});

let marker;

const Marker = (props) => {
  return (
    <>
      <RoomIcon
        id='output'
        sx={{ overflow: 'hidden', fontSize: 48, color: '#fa3305' }}
      />
    </>
  );
};

export const SetLocation = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [currentLat, setcurrentLat] = useState();
  const [currentLong, setcurrentLong] = useState();

  const [cordinates, setCordinates] = useState([currentLat, currentLong]);
  const [selected, setSelected] = useState(null);

  const [locationName, setlocationName] = useState('');

  const [latlong, setlatlong] = useState({ lat: currentLat, lng: currentLong });

  const onChangeHandler = async (e) => {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById('output');
      output.src = reader.result;
      console.log(reader.result);
    };
    if (e.target.files[0]) {
      const file = e.target.files[0];
      reader.readAsDataURL(file);

      console.log(file);

      formik.setFieldValue('pics', file);
    }
  };

  function changeaddress(value) {
    console.log(value);
  }
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      pics: '',
      lat: currentLat,
      long: currentLong,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('erforderlich'),
      description: Yup.string().required('erforderlich'),
      pics: Yup.string().required('erforderlich'),

      lat: Yup.number().required('erforderlich'),
      long: Yup.number().required('erforderlich'),
    }),
    onSubmit: async (values) => {
      console.log('values---------');

      if (localStorageData('_id')) {
        values.userid = localStorageData('_id');

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('pics', values.pics);
        formData.append('lat', currentLat);
        formData.append('long', currentLong);
        formData.append('userId', localStorageData('_id'));

        addNewSuggestion.mutate(formData);

        console.log(values);
      } else {
        toast.error('Erstellen Sie ein Profil um fortzufahren');
      }

      // toast('');
      ////toast.success('Signin');
    },
  });

  const addNewSuggestion = useMutation(
    (NewSuggestion) =>
      userServices.commonPostService('/post/uploadPost', NewSuggestion),
    {
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (res) => {
        toast.success('Ihr Antrag wurde erfolgreich erstellt und wird überprüft');
        navigate('/');
      },
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadMap = (map, maps) => {
    console.log('------------------map', map);

    console.log('------------------maps', maps);

    marker = new maps.Marker({
      position: { lat: currentLat, lng: currentLong },
      map,
      draggable: true,
    });

    marker.addListener('dragend', function (e) {
      console.log(this.getPosition().toJSON()); // this === marker

      setcurrentLat(this.getPosition().toJSON().lat);
      setcurrentLong(this.getPosition().toJSON().lng);
    });
  };

  useEffect(() => {
    if (currentLat && currentLong) {
      let payload = {
        lat: currentLat,
        long: currentLong,
      };

      dispatch(SET_LatLong(payload));

      Geocode.fromLatLng(
        currentLat,
        currentLong
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

          dispatch(SET_City({ locationName: city, manualLocation: true }));
          ///  setlocationName(city);
        },
        (error) => {
          console.error(error);

          //   dispatch(
          //     SET_City({ locationName: 'Standort', manualLocation: false })
          //   );

          //   let payload = {
          //     lat: 'false',
          //     long: 'false',
          //   };

          //   dispatch(SET_LatLong(payload));
        }
      );
    }
  }, [currentLat, currentLong]);

  return (
    <div>
      <div className='casual-header-div '>
        <button className='back-button-button' onClick={() => navigate(-1)}>
          
          <img
            className='back-button-icon'
            src={require('./img/arrow-left-short.svg')}
          />
        </button>

        <h4 className=' headline headline-with-back-button '> Ihr Standort </h4>
      </div>
      <div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          height: '100%',
          width: '100%',
        }}
      >
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapAPiKey}`}
          loadingElement={<div style={{ height: `100%` }} />}


          containerElement={<div style={{ height: `100%`, width: '100%' }} />}

          mapElement={<div style={{ height: `100%` }} />}
          setlat={setcurrentLat}
          setlong={setcurrentLong}
          latlong={latlong}
          setlatlong={setlatlong}
          setlocationName={setlocationName}
        />
      </div>
      <NavbarBottom
        classstart='under-navitem-unselected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div>
  )
}
