
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
            maxLength='300'
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
      <Link to='/info'>
        <img src={require('./img/info-circle.svg')} className='info-image-comments' />
      </Link>
      <nav className='nav under-navbar'>
      <Link to='/' className={`nav__link under-navitem-selected`}>
        <i
          className='material-icons nav__icon '
          style={{ 'font-size': '35px' }}
        >
          home
        </i>
        <span className='nav__text'>Start</span>
      </Link>
      <Link to='/suche' className={`nav__link under-navitem-unselected`}>
        <i
          className='material-icons nav__icon '
          style={{ 'font-size': '35px' }}
        >
          search
        </i>
        <span className='nav__text'>Suche</span>
      </Link>
      <a
        // to={localStorageData('_id') ? '/antrag-erstellen' : '/dein-profil'}
        onClick={() => route()}
        className='nav__link under-navitem-selected'
      >
        <i
          className='material-icons nav__icon'
          style={{ 'font-size': '55px' }}
        >
          add_circle_outline
        </i>

        <span className='nav__text'></span>
      </a>
      <Link to='/aktivitat' className={`nav__link under-navitem-unselected`}>
        <i
          className='material-icons nav__icon '
          style={{ 'font-size': '35px' }}
        >
          bolt
        </i>
        <span className='nav__text'>Aktivität</span>
      </Link>
      <Link to='/dein-profil' className={`nav__link under-navitem-unselected`}>
        <i
          className='material-icons nav__icon '
          style={{ 'font-size': '35px' }}
        >
          person
        </i>
        <span className='nav__text'>Profil</span>
      </Link>
    </nav>
    </div>
  );
};