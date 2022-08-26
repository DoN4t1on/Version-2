import { NavbarBottom } from './NavbarBottom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Address from './Address';
import FormControl from '@mui/material/FormControl';
import { storeLocalData } from './services/auth/localStorageData';
import { localStorageData, Logout } from './services/auth/localStorageData';
import InputLabel from '@mui/material/InputLabel';
import ErrorService from './services/formatError/ErrorService';
import userServices from './services/httpService/userAuth/userServices';
import GoogleMapReact from 'google-map-react';
import { useFormik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import InputAdornment from '@mui/material/InputAdornment';
import { ImageEndPoint } from './config/config';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import OutlinedInput from '@mui/material/OutlinedInput';
import Signin from './Signin';
import Signup from './Signup';

export const YourProfile = () => {
  const Input = styled('input')({
    display: 'none',
  });

  let navigate = useNavigate();
  const [email, setemail] = React.useState(
    localStorageData('email') ? localStorageData('email') : ''
  );

  const [desc, setdesc] = React.useState(localStorageData('description'));

  const [lat, setlat] = React.useState('');

  const [long, setlong] = React.useState('');

  const [link, setlink] = React.useState(localStorageData('link'));

  const [fname, setfname] = React.useState(localStorageData('fname'));

  const [location, setlocation] = React.useState(localStorageData('address'));
  const [pic, setpic] = React.useState('');

  const [cordinates, setCordinates] = React.useState('');

  // const handleChange1 = (event) => {
  //   setName1(event.target.value);
  // };
  // const handleChange2 = (event) => {
  //   setName2(event.target.value);
  // };
  // const handleChange3 = (event) => {
  //   setName3(event.target.value);
  // };
  // const handleChange4 = (event) => {
  //   setName4(event.target.value);
  // };

  const updateProfile = useMutation(
    (NewProfile) =>
      userServices.commonPostService('/userAuth/updateuserinfo', NewProfile),
    {
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (res) => {
        storeLocalData(res.data.data);

        // storeLocalData(data.data);

        toast.success('Das Profil wurde aktualisiert');
        navigate('/');
        /// navigate('/');
      },
    }
  );

  const theme = createTheme({
    palette: {
      success: {
        main: '#28a745',
      },
    },
  });

  const updateUserProfile = async (e) => {
    const formData = new FormData();
    formData.append('userId', localStorageData('_id'));
    formData.append('lat', lat);
    formData.append('long', long);
    formData.append('fname', fname);
    formData.append('location', location);
    formData.append('link', link);
    formData.append('pics', pic);
    formData.append('desc', desc);
    updateProfile.mutate(formData);
  };

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

      setpic(file);

      console.log(file);
    }
  };

  function changeaddress(value) {
    console.log(value);
  }

  return (
    <div>
      <div className='casual-header-div'>
        <Link to='/einstellungen'>
          {' '}
          <img
            className='settings-image'
            src={require('./img/settings.svg')}
          />{' '}
        </Link>
        <h4 className='headline headline-profilesettings'> Dein Profil </h4>
      </div>

      <div className='casual-menu'>
        {localStorageData('_id') ? (
          ''
        ) : (
          <>
            <Signin />

            <br></br>
            <Signup />
          </>
        )}

        <br />

        {localStorageData('_id') ? (
          <ThemeProvider theme={theme}>
            {/* <FormControl>
              <InputLabel color='success' htmlFor='component-outlined'>
                E-Mail
              </InputLabel>
              <OutlinedInput
                color='success'
                id='component-outlined'
                value={email}
                disabled={true}
                label='E-Mail'
                sx={{ minWidth: '200px' }}
              />
            </FormControl> */}

            <img
              id='output'
              height='180'
              width='180'
              src={
                localStorageData('pic') != ''
                  ? ImageEndPoint + localStorageData('pic')
                  : require('./img/profile.png')
              }
              className='profile-picture-fullscreen'
            />

            <br />
            {/* <Link onChange={onChangeHandler} to=''> */}

            <label htmlFor='icon-button-file'>
              <Input
                accept='image/*'
                onChange={onChangeHandler}
                id='icon-button-file'
                type='file'
              />

              <img className='margin-bottom' src={require('./img/edit.svg')} />
            </label>

            {/* </Link> */}
            <br />
            <br />

            <TextField
              id='outlined-start-adornment'
              label='Name'
              onChange={(e) => setfname(e.target.value)}
              value={fname}
              multiline
              rows={1}
              sx={{ minWidth: '200px', maxheight: '5' }}
              color='success'
            />

            <br />
            <br />

            <div>
              <TextField
                id='outlined-multiline-static'
                label='Beschreibung'
                onChange={(e) => setdesc(e.target.value)}
                value={desc}
                multiline
                rows={4}
                sx={{ minWidth: '250px' }}
                color='success'
              />
              <br />
              <br />
              <TextField
                label='Webseite'
                size='small'
                onChange={(e) => setlink(e.target.value)}
                value={link}
                id='outlined-start-adornment'
                sx={{ m: 1, width: '18ch' }}
                color='success'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <img
                        className='link-your-profile'
                        src={require('./img/link.svg')}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
{/* 
              <TextField
                label='Standort'
                size='small'
                id='outlined-start-adornment'
                sx={{ m: 1, width: '18ch' }}
                color='success'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <img
                        className='location-marker-your-profile'
                        src={require('./img/location-marker-profile.svg')}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              */}
              {/* 
              <Address
                label='Standort'
                className='pac-container'
                setlat={setlat}
                setlong={setlong}
                changeaddress={changeaddress}
                location={location}
                setlocation={setlocation}
              /> */}
              
              < br />
              <button
                className='btn btn-success btn-lg button'
                type='submit'
                id='Update'
                onClick={() => {
                  updateUserProfile();
                }}
              >
                Aktualisieren
              </button>
            </div>
          </ThemeProvider>
        ) : null}
      </div>
      <NavbarBottom
        classstart='under-navitem-unselected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-selected'
      />
    </div>
  );
};
