import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import AppleSignin from "react-apple-signin-auth";
import { useDispatch, useSelector } from 'react-redux';
import { useCreateGoogleAccount, useCreateFacebookAccount } from './hooks';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from './reactStore/actions/Actions';
function SocialLogin() {
  let navigate = useNavigate();
  const { mutateAsync: createGoogleAccount } = useCreateGoogleAccount();
  const { mutateAsync: createFacebookAccount } = useCreateFacebookAccount();
  const dispatch = useDispatch();
  const responseGoogle = async (data) => {
    let newdata = {
      email: data.profileObj.email,
      fname: data.profileObj.name,
      id: data.googleId,
      pic: data.profileObj.imageUrl,
    };

    console.log('new data-----------');

    console.log(newdata);

    const response = await createGoogleAccount(newdata);

    if (response.status) {
      dispatch(LOGIN(response.data));
      navigate('/');
    }
  };

  async function GoogleFailureRequest(data) {
    console.log(data);
    // toast.error('Sorry!! Request Failed With Google');
  }
  async function FacebookLoginSuccessRequest(data) {
    console.log('new data---facebook--------');

    let newdata = {
      email: data.email,
      fname: data.name,
      id: data.id,
      pic: data.picture.data.url,
    };

    console.log('new data-----------');

    console.log(newdata);

    const response = await createFacebookAccount(newdata);

    if (response.status) {
      dispatch(LOGIN(response.data));

      navigate('/');

      ////  navigate('/account/home');
    }
  }

  return (
    <div>
      <div>
        <GoogleLogin
          clientId={
            '734561135969-drb2maqgl82if6m1qs6uusclmsffdvoh.apps.googleusercontent.com'
          }
          render={(renderProps) => (
            <button
              className='btn-social shadow-sm'
              onClick={renderProps.onClick}
            >
              <i className='fab fa-google '></i>
              <span className='mx-2'>Weiter mit Google</span>
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={GoogleFailureRequest}
          cookiePolicy={'single_host_origin'}
        ></GoogleLogin>
      </div>

      <div className='my-3'>
        <FacebookLogin
          appId={'670076524299446'}
          textButton='Weiter mit Facebook'
          fields='name,email,picture'
          callback={FacebookLoginSuccessRequest}
          cssClass='btn-social btn-facebook text-white shadow-sm mx-4'
          icon={<i className='fab fa-facebook   mx-2'></i>}
        />
      </div>

    </div>
  );
}

export default SocialLogin;
