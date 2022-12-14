import { NavbarBottom } from './NavbarBottom';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import WrappedMap from './Maps';
import { mapAPiKey } from './config/config';
import { store } from './reactStore/MainStore';
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

export const CreateASuggestion = () => {
  let navigate = useNavigate();

  const [currentLat, setcurrentLat] = useState(store.getState().Geo.lat);
  const [currentLong, setcurrentLong] = useState(store.getState().Geo.long);

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

      ///lat: Yup.number().required('erforderlich'),
      //// long: Yup.number().required('erforderlich'),
    }),
    onSubmit: async (values) => {
      console.log('values--------------------', values);

      // window.scrollTo({ top: 0, behavior: 'smooth' });

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

  return (
    <div>
      <div className='casual-header-div'>
        <h4 className='headline'>Erstellen Sie einen Antrag</h4>
      </div>

      <div className='casual-menu'>
        <form onSubmit={formik.handleSubmit}>
          {/* <p className='Pflichtfeld'>* = Pflichtfeld</p> */}
          <br />
          <p className='create-titel create-font-size'>Titel:</p>

          <input
            id='title'
            name='title'
            type='title'
            maxLength='60'
            className='input-style1'

            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className='error-color'>{formik.errors.title}</div>
          ) : null}

          <br />
          <br />

          <p className='create-font-size'>Bild:</p>

          <label htmlFor='icon-button-file'>
            <Input
              accept='image/*'
              onChange={onChangeHandler}
              id='icon-button-file'
              type='file'
            />
            {formik.values.pics ? (
              <div>
                <img
                  id='output'
                  src='https://ui-avatars.com/api/?name=John+Doe'
                  className='upload-img max-width-100'
                  alt=''
                />
              </div>
            ) : null}
            <div>
              <IconButton
                size='large'
                id='output'
                aria-label='upload picture'
                component='span'
              >
                <PhotoCamera
                  id='output'
                  sx={{ fontSize: 45, color: '#28a745' }}
                />
              </IconButton>
            </div>
          </label>
          {formik.touched.pics && formik.errors.pics ? (
            <div className='error-color'>{formik.errors.pics}</div>
          ) : null}

          <p className='create-font-size'>Begründung:</p>

          <div className=''>
            <textarea
              id='description'
              name='description'
              type='description'
              className='input-style2'
              rows='5'
              cols='2'


              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />



            {formik.touched.description && formik.errors.description ? (
              <div className='error-color'>{formik.errors.description}</div>
            ) : null}
          </div>

          {/* <PlacesAutocomplete setSelected={setSelected} /> */}

          <p className='create-font-size'>Standort:</p>

          {/* <Address
            label='Address'
            // setaddress={setaddress}
            className='pac-container'
            setlat={setcurrentLat}
            changeaddress={changeaddress}
            setCordinates={setCordinates}
            setlong={setcurrentLong}
          /> */}


          <div className='create-map-div'>
            {/* <GoogleMapReact
              bootstrapURLKeys={{
                key: 'key',
                libraries: 'places',
              }}
              center={cordinates}
              defaultZoom={10}
              yesIWantToUseGoogleMapApiInternals
              //  onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
            > */}
            {/* <Marker lat={currentLat} lng={currentLong} /> */}
            {/* </GoogleMapReact> */}

            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapAPiKey}`}
              loadingElement={<div style={{ height: `100%`, borderRadius: '10px' }} />}
              containerElement={<div style={{ height: `200px`, borderRadius: '10px' }} />}
              mapElement={<div style={{ height: `180%`, borderRadius: '10px', width: '100%', border: '1px solid #28a745' }} />}
              setlat={setcurrentLat}
              setlong={setcurrentLong}
              latlong={latlong}
              setlatlong={setlatlong}
              setlocationName={setlocationName}
            />

          </div>
          <br />
          {/*
          <input
            id='location'
            name='location'
            type='location'
            className='input-styl'
            placeholder={'Standort'}
            style={{ color: 'black' }}
            
            disabled={true}
            value={locationName}
          /> */}

          <br />
          {addNewSuggestion.isLoading ? (
            <CircularProgress />
          ) : (
           <button type='submit' className='btn btn-success btn-lg button border-black'>
              Erstellen
            </button>
          )}
        </form>
      </div>

      <NavbarBottom
        classstart='under-navitem-unselected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );
};
