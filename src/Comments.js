
import { NavbarBottom } from "./NavbarBottom";
import { Comment } from "./Comment";
import { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { localStorageData, Logout } from './services/auth/localStorageData';
import ErrorService from './services/formatError/ErrorService';
import userServices from './services/httpService/userAuth/userServices';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';
import { ImageEndPoint } from './config/config';

export const Comments = () => {
  const localtz = moment.tz.guess();
  const { Id } = useParams();

  const UploadNewComment = useMutation(
    (NewComment) =>
      userServices.commonPostService('/post/uploadComment', NewComment),
    {
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (res) => {
        getComments.refetch();
        /// navigate('/');
      },
    }
  );

  const [allComments, setallComments] = React.useState([]);

  const getComments = useQuery(
    'getCommentshere',
    () => userServices.commonGetService(`/post/getComments/${Id}`),
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (res) => {
        console.log(res.data.data);
        setallComments(res.data.data);
      },
    }
  );
  const [amount, setAmount] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (localStorageData('_id')) {
      UploadNewComment.mutate({
        userId: localStorageData('_id'),
        postId: Id,
        own_experience: amount,
      });
      setAmount('');
    } else {
      toast.error('Erstelle ein Profil um fortzufahren');
    }
  };

  return (
    <div>

      <div className='casual-header-div '>
        <Link to='/'>
          {' '}
          <img
            className='back-button'
            src={require('./img/arrow-left-short.svg')}
          />{' '}
        </Link>
        <h4 className=' headline headline-with-back-button '>
          {' '}
          Kommentare ({allComments.length})
        </h4>
      </div>


      <div className='comment-menu'>
        {allComments.map((item) => (
          <Comment item={item} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='comment-bar'>
          <input
            value={amount}
            type='text'
            className='comment-input'
            placeholder='Kommentieren'
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type='submit' className='btn btn-ghost-light comment-button'>
            <img
              className='comment-image'
              src={require('./img/send-comment.svg')}
            />
          </button>
        </div>
      </form>

      <NavbarBottom
        classstart='under-navitem-selected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );
};