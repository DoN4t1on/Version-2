import { NavbarBottom } from './NavbarBottom';
import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { localStorageData, Logout } from './services/auth/localStorageData';
import ErrorService from './services/formatError/ErrorService';
import userServices from './services/httpService/userAuth/userServices';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { ImageEndPoint } from './config/config';
export const Profile = () => {
  const { Id } = useParams();

  const [userDetail, setuserDetail] = React.useState();

  const getAllPosts = useQuery(
    'getSingleuserData',
    () => userServices.commonGetService(`/userAuth/getSingleUserDetail/${Id}`),
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (res) => {
        console.log(res.data.data);
        setuserDetail(res.data.data);
      },
    }
  );

  return (
    <div>
      {userDetail ? (
        <>
          <div className='casual-header-div '>
          <Link to='/'>
          {' '}
          <img
            className='back-button'
            src={require('./img/arrow-left-short.svg')}
          />{' '}
        </Link>
            <h4 className=' headline headline-with-back-button '> Profil </h4>
          </div>

          <div className='casual-menu'>
            <p className='profile-name'>{userDetail.fname}</p>

            <img
              src={
                userDetail.pic
                  ? ImageEndPoint + userDetail.pic
                  : require('./img/profile.png')
              }
              className='profile-picture-fullscreen'
            />
            <br />
            <p className='profile-description'>{userDetail.description}</p>
            <span className='profile-link-span'>
              <img
                className='link-profile'
                src={userDetail.link != '' ? require('./img/link.svg') : ''}
              />
              <a
                className='profile-link'
                onClick={() => window.open(userDetail.link)}
              >
                {userDetail.link}
              </a>
            </span>
            {userDetail.address != '' ? (
                <p> {/* 
               <img
                  className='location-marker-profile'
                  src={require('./img/location-marker-profile.svg')}
                /> 
                {userDetail.address}
             */} </p>  
            ) : null}
            
          </div>  
          <NavbarBottom
            classstart='under-navitem-selected'
            classsearch='under-navitem-unselected'
            classactivity='under-navitem-unselected'
            classprofile='under-navitem-unselected'
          />
        </>
      ) : null}
    </div>
  );
};
