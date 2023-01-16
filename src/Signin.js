import React from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SocialLogin from "./SocialLogin";
import Signup from './Signup';

import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

import { LOGIN } from './reactStore/actions/Actions';
import { EMPTYSOTRE } from './reactStore/actions/Actions';
import { useLoginEmailAccount } from './hooks';

import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function Signin() {
  const [open, setOpen] = React.useState(false);

  const [OpenSignUp, setOpenSignUp] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const responseGoogle = (response) => {
    console.log(response);
    alert('Login successful');
  };

  const dispatch = useDispatch();
  const { mutateAsync: loginEmailAccount, isLoading } = useLoginEmailAccount();

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      pass: '',
      username: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(4, 'Länge muss mehr als 4 Zeichen betragen')
        .required('erforderlich'),
      pass: Yup.string()
        .min(8, 'Länge muss mehr als 8 Zeichen betragen')
        .required('erforderlich'),
    }),
    onSubmit: async (values) => {
      console.log('values---------');

      console.log(values);

      const response = await loginEmailAccount(values);

      if (response.status) {
        let res = response.data;
        //// res.rememberMe=false

        dispatch(LOGIN(res));

        navigate('/');
      }

      // toast('');
      ////toast.success('Signin');
    },
  });

  function signUpMe() {
    setOpen(false);
    setOpenSignUp(true);
  }

  return (
    <div>
      <button
        className='btn btn-success btn-lg button'
        type='submit'
        id='Donate'
        onClick={handleClickOpen}
      >
        Einloggen
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Login-Dienst verwenden?'}
        </DialogTitle>
        <DialogContent>
          <SocialLogin />
          <hr className='separator my-4' />
          <form onSubmit={formik.handleSubmit} className='mt-4'>
            <div className='relative w-full mb-3 '>
              <input
                id='username'
                name='username'
                type='username'
                className='input-style1'
                placeholder={'Email'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className='error-color'>{formik.errors.username}</div>
              ) : null}
            </div>

            <div className='relative w-full mb-3'>
              <input
                name='pass'
                id='pass'
                type='password'
                className='input-style1'
                placeholder={'Passwort'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pass}
              />
              {formik.touched.pass && formik.errors.pass ? (
                <div className='error-color'>{formik.errors.pass}</div>
              ) : null}
            </div>

            <div className='my-4'>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <button
                    type='submit'
                    className='btn btn-success btn-lg button btn-sign border-black'
                  >
                    Einloggen
                  </button>
                </>
              )}
            </div>
          </form>
          <div className='largediv' />
        </DialogContent>
        <DialogActions>
          <Button color='success' onClick={handleClose} autoFocus>
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Signin;
