import React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SocialLogin from './SocialLogin';

import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

import { LOGIN } from './reactStore/actions/Actions';
import { EMPTYSOTRE } from './reactStore/actions/Actions';
import { useLoginEmailAccount, useCreateEmailAccount } from './hooks';

import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function Signup() {
  const [open, setOpen] = React.useState(false);

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
  const { mutateAsync: createEmailAccount, isLoading } =
    useCreateEmailAccount();

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      pass: '',
      username: '',
      email: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(4, 'Länge muss mehr als 4 Zeichen betragen')
        .required('erforderlich'),

      email: Yup.string()
        .min(4, 'Länge muss mehr als 4 Zeichen betragen')
        .required('erforderlich'),
      pass: Yup.string()
        .min(8, 'Länge muss mehr als 8 Zeichen betragen')
        .required('erforderlich'),
    }),
    onSubmit: async (values) => {
      console.log('values---------');

      console.log(values);

      const response = await createEmailAccount(values);

      if (response.status) {
        let res = response.data;
        //// res.rememberMe=false

        navigate('/');
      }
    },
  });

  return (
    <div>
      <button
        className='btn btn-success btn-lg button border-black'
        type='submit'
        id='Donate'
        onClick={handleClickOpen}
      >
        Registrieren
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
                placeholder={'Name'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className='error-color'>{formik.errors.username}</div>
              ) : null}
            </div>

            <div className='relative w-full mb-3 '>
              <input
                id='email'
                name='email'
                type='email'
                className='input-style1'
                placeholder={'Email'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='error-color'>{formik.errors.email}</div>
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
                    Registrieren
                  </button>
                </>
              )}
            </div>
          </form>
          <div className='largediv' />

          {/* <DialogContentText
            style={{ hidden: 'true' }}
            id='alert-dialog-description'
          >
            Lassen Sie Login Apps bei der Standortbestimmung helfen. Das
            bedeutet, dass anonyme Standortdaten an Login gesendet werden, auch
            wenn keine Apps
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='success' autoFocus>
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Signup;
