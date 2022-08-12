
import React, { useState, useEffect } from 'react';
import { Petition } from './Petition';
import { NavbarBottom } from './NavbarBottom';
import Spielplatz from './img/playground_petition.jpg';
import Parkbank from './img/bench.jpg';
import Sportplatz from './img/sportsfield.jpg';
import Radweg from './img/bikeway.jpg';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import ErrorService from './services/formatError/ErrorService';
import userServices from './services/httpService/userAuth/userServices';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
export const PetitionsAcceptedMostPopular = () => {
  const [allPost, setallPost] = React.useState([]);

  //////const { allPost } = useSelector((state) => state.Posts);

  const [chunksPost, setchunksPost] = React.useState(0);
  const [moreRefetch, setmoreRefetch] = React.useState(true);

  const getAllPosts = useQuery(
    'allmostpopulardata',
    () => userServices.commonGetService(`/post/getAllPost/${chunksPost}`),
    {
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

  return (
    <div>
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
          <Link to='/' className=''>
            Aktiv{' '}
          </Link>
          |
          <Link to='/antrage-akzeptiert' className='strong'>
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
          <Link to='/' className=''>
            Am nächsten{' '}
          </Link>
          |{' '}
          <Link to='/' className=''>
            {' '}
            Neuste{' '}
          </Link>
          |{' '}
          <Link to='/' className=''>
            {' '}
            Beliebtest
          </Link>{' '}
        </p>
      </div>
      <div className='campaigns no-data'>
        In diesem Gebiet befinden sich noch keine akzeptierten
        Crowdfundingkampagnen. Wir sind bereits im Dialog mit der öffentlichen
        Verwaltung. Gerne können Sie diese auch persönlich kontaktieren.
      </div>
      <NavbarBottom
        classstart='under-navitem-selected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );
};