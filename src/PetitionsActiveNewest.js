


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Petition } from './Petition';
import { NavbarBottom } from './NavbarBottom';
import Spielplatz from './img/playground_petition.jpg';
import { ImageEndPoint } from './config/config';
import Parkbank from './img/bench.jpg';
import Sportplatz from './img/sportsfield.jpg';
import Radweg from './img/bikeway.jpg';
import ErrorService from './services/formatError/ErrorService';
import userServices from './services/httpService/userAuth/userServices';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Header from './components/Header';
import ReactGA from 'react-ga4';
import { useDispatch, useSelector } from 'react-redux';
import { Get_All_POSTS } from './reactStore/actions/Actions';

export const PetitionsActiveNewest = () => {
  const dispatch = useDispatch();

  const [allPost, setallPost] = React.useState([]);

  //////const { allPost } = useSelector((state) => state.Posts);

  const [chunksPost, setchunksPost] = React.useState(0);

  const [moreRefetch, setmoreRefetch] = React.useState(true);

  const getAllPosts = useQuery(
    'allpostPetitions',
    () =>
      userServices.commonGetService(
        `/post/getAllPost/${chunksPost}/false/false`
      ),
    {
      ////enabled: lat == '' || long == '' ? false : true,
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

  function track() {
    ReactGA.initialize('G-L7KNR2MM11');
    ReactGA.send('/');
  }
  useEffect(() => {
    track();
  }, []);
  return (
    <div>
      <div id='header'>
        <p className='location' id='location'>
          <Link to='/karte'>
            Köln{' '}
            <img id='filter' src={require('./img/funnel-fill.svg')} />{' '}
          </Link>{' '}
        </p>

        <p className='menu1 small-headlines'>
          {' '}
          <Link className='strong' to='/'>
            Petitionen
          </Link>{' '}
          | <Link to='/crowdfunding'>Crowdfunding</Link>
        </p>
        <p className='menu2 small-headlines '>
          {' '}
          <Link to='/' className='strong'>
            Aktiv{' '}
          </Link>
          |
          <Link to='/petitionen-akzeptiert' className=''>
            {' '}
            Akzeptiert{' '}
          </Link>
          |{' '}
          <Link to='/petitionen-abgelehnt' className=''>
            Abgelehnt{' '}
          </Link>{' '}
        </p>
        <p className='last-menu small-headlines'>
          {' '}
          <Link to='/' className=''>
            Am nächsten{' '}
          </Link>
          |{' '}
          <Link to='/petitionen-aktiv-neuste' className='strong'>
            {' '}
            Neuste{' '}
          </Link>
          |{' '}
          <Link to='/petitionen-aktiv-am-beliebtesten' className=''>
            {' '}
            Beliebtest
          </Link>{' '}
        </p>
      </div>
      <div className='campaigns'>
        {allPost.map((item) => (
          <Petition item={item} />
        ))}
      </div>
      <NavbarBottom
        classstart='under-navitem-selected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );
};;;;
