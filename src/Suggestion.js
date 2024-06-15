import { useState, useEffect } from 'react';
import upvoteempty from './img/arrow-up.svg';
import upvotefull from './img/arrow-up-fill.svg';
import downvoteempty from './img/arrow-down.svg';
import downvotefull from './img/arrow-down-fill.svg';
import pinimageempty from './img/pin.svg';
import pinimagefull from './img/pin-fill.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ImageEndPoint } from './config/config';
import { localStorageData, Logout } from './services/auth/localStorageData';
import ErrorService from './services/formatError/ErrorService';
import userServices from './services/httpService/userAuth/userServices';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';
import Grid from '@mui/material/Grid';

// import { useNavigate } from '@reach/router';

export const Suggestion = (Suggestion) => {
  const navigate = useNavigate();
  const localtz = moment.tz.guess();
  const [sumcounter, setSumcounter] = useState(
    Suggestion.item.upvotes.length - Suggestion.item.downvotes.length
  );

  const [upvotecounter, setUpvotecounter] = useState(
    Suggestion.item.upvotes.length
  );

  const [downvotecounter, setDownvotecounter] = useState(
    Suggestion.item.downvotes.length
  );

  const [upvoteimage, setUpvoteimage] = useState(upvoteempty);

  const [downvoteimage, setDownvoteimage] = useState(downvoteempty);

  useEffect(() => {
    Suggestion.item.downvotes.map((item) => {
      if (item.userId == localStorageData('_id')) {
        setDownvoteimage(downvotefull);
      }
    });
    Suggestion.item.upvotes.map((item) => {
      if (item.userId == localStorageData('_id')) {
        setUpvoteimage(upvotefull);
      }
    });
  }, []);

  const [pinimage, setPinimage] = useState(pinimageempty);

  const [supporters, setSupporters] = useState(Suggestion.item.bidder);

  const [amount, setAmount] = useState();

  const BidOnPost = useMutation(
    (NewBid) => userServices.commonPostService('/post/bidOnPost', NewBid),
    {
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (res) => {
        ///console.log(res.data.isNew);

        if (res.data.isNew) {
          setSupporters(supporters + 1);
        }
        //// getComments.refetch();
        /// navigate('/');
      },
    }
  );

  const UpvoteOnPost = useMutation(
    (NewBid) => userServices.commonPostService('/post/upVote', NewBid),
    {
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (res) => {
        console.log(res.data.data);
        setUpvotecounter(res.data.data[0].upvotes.length);
        setDownvotecounter(res.data.data[0].downvotes.length);
        setSumcounter(
          res.data.data[0].upvotes.length - res.data.data[0].downvotes.length
        );
        //// getComments.refetch();
        /// navigate('/');
      },
    }
  );

  const DownvoteOnPost = useMutation(
    (down) => userServices.commonPostService('/post/downVote', down),
    {
      onError: (error) => {
        toast.error(ErrorService.uniformError(error));
      },
      onSuccess: (res) => {
        console.log(res.data.data);
        setUpvotecounter(res.data.data[0].upvotes.length);
        setDownvotecounter(res.data.data[0].downvotes.length);
        setSumcounter(
          res.data.data[0].upvotes.length - res.data.data[0].downvotes.length
        );

        //// getComments.refetch();
        /// navigate('/');
      },
    }
  );

  const redirectToLogin = () => {
    navigate("/dein-profil", {replace: true})
    toast.error('Erstellen Sie ein Profil um fortzufahren');
  }

  // const navigate = useNavigate();
  const upvote = () => {
    if (localStorageData('_id')) {
      if (upvoteimage == upvotefull) {
        setUpvoteimage(upvoteempty);
      } else {
        setUpvoteimage(upvotefull);
      }

      setDownvoteimage(downvoteempty);

      //// console.log(data);

      UpvoteOnPost.mutate({
        userId: localStorageData('_id'),
        postId: Suggestion.item._id,
        timeZone: localtz,
        dateTime: new Date(),
      });
    } else {
      redirectToLogin()
    }

    // if (upvotecounter == 0) {
    //   setUpvotecounter(upvotecounter + 1);

    //   setSumcounter(sumcounter + 1);
    //   setUpvoteimage(upvotefull);
    //   if (downvotecounter == -1) {
    //     setDownvotecounter(downvotecounter + 1);
    //     setSumcounter(sumcounter + 2);
    //     setDownvoteimage(downvoteempty);
    //   }
    // }

    // if (upvotecounter == 1) {
    //   setUpvotecounter(upvotecounter - 1);

    //   setSumcounter(sumcounter - 1);
    //   setUpvoteimage(upvoteempty);
    // }
  };

  const downvote = () => {
    if (localStorageData('_id')) {
      if (downvoteimage == downvotefull) {
        setDownvoteimage(downvoteempty);
      } else {
        setDownvoteimage(downvotefull);
      }

      setUpvoteimage(upvoteempty);

      //// console.log(data);

      DownvoteOnPost.mutate({
        userId: localStorageData('_id'),
        postId: Suggestion.item._id,
        timeZone: localtz,
        dateTime: new Date(),
      });
    } else {
      redirectToLogin()
    }

    // if (downvotecounter == 0) {
    //   setDownvotecounter(downvotecounter - 1);
    //   setSumcounter(sumcounter - 1);
    //   setDownvoteimage(downvotefull);
    //   if (upvotecounter == 1) {
    //     setUpvotecounter(upvotecounter - 1);

    //     setSumcounter(sumcounter - 2);
    //     setUpvoteimage(upvoteempty);
    //   }
    // }

    // if (downvotecounter == -1) {
    //   setDownvotecounter(downvotecounter + 1);
    //   setSumcounter(sumcounter + 1);
    //   setDownvoteimage(downvoteempty);
    // }
  };

  const mark = () => {
    if (pinimage == pinimageempty) {
      setPinimage(pinimagefull);
    }
    if (pinimage == pinimagefull) {
      setPinimage(pinimageempty);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (supporters == 0) {
    //   setSupporters(1);
    // }

    if (localStorageData('_id')) {
      //// console.log(data);

      BidOnPost.mutate({
        userId: localStorageData('_id'),
        postId: Suggestion.item._id,
        amount: amount,
        timeZone: localtz,
        dateTime: new Date(),
      });
      setAmount('');
    } else {
      toast.error('Erstellen Sie ein Profil um fortzufahren');
    }
  };

  return (
    <div className='single-campaign'>
      <div className='campaign-header'>
        <Link style={{ visibility: 'hidden' }} to='/'>
          <button className='btn btn-success button small'>
            <img className='clock' src={require('./img/clock-fill.svg')} />
            (Zeit)
          </button>
        </Link>

        <Link
          to={`/melden`}
          state={{
            name: 'Suggestion',
            Id: Suggestion.item._id,

            link: `https://app.lokalspende.org/geteilter-antrag/${Suggestion.item._id}`,
          }}
        >
          {' '}
          <img src={require('./img/three-dots.svg')} className='report' />{' '}
        </Link>
        <div className='post-creator-div'>
          <Link to={`/profil/${Suggestion.item.user._id}`}>
            {Suggestion.item.user != '' ? (
              <button className='btn btn-success button small position-right'>
                <span className='Suggestion-creator-name'>
                  {Suggestion.item.user.fname}
                </span>
                 {/*
                <img
                  src={
                    Suggestion.item.user.pic
                      ? ImageEndPoint + Suggestion.item.user.pic
                      : require('./img/profile.png')
                  }
                  className='profile-picture'
                /> */}
              </button>
            ) : (
              ''
            )}
          </Link>
          <br />
          {/* <img
            src={pinimage}
            className='marker-image'
            onClick={mark}
            id='marker-svg'
          />*/}
        </div>
      </div>

      <p className='Suggestion-titel'> {Suggestion.item.title} </p>

      <img
        src={ImageEndPoint + Suggestion.item.pic}
        className='Suggestion-picture'
      />

      <br />

      <p className='Suggestion-desc'> {Suggestion.item.description} </p>

      <p className='donation-statements'> Spendenzusagen: </p>

      <Link
        to={`/spendenzusagen/${Suggestion.item._id}`}
        className='unterstützer-link'
      >
       <p className='Supporters'>{supporters}</p>
        
      </Link>
    
      <form onSubmit={handleSubmit}>
        <p className='amount-p'>
          <input
            type='number'
            min='1'
            value={amount}
            className='amount'
            id='inputAmount'
            placeholder='0'
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
          <span className='euros'>€</span>
        </p>

        <button
          className='btn btn-success button-Suggestion btn-lg button border-black'
          type='submit'
          id='Donate'
        >
          Spende zusagen
        </button>
      </form>

      <div className='interaction-bar'>

        <div className='voting-div'>
          <div>
            <img
              onClick={upvote}
              src={upvoteimage}
              className='voting-button'
              id='upvotebutton'
            />
            <Link className='linkblack' to={`/upvoter/${Suggestion.item._id}`}>
              <p id='upvotes' className='voting-counter-upanddown '>
                {upvotecounter}
              </p>
            </Link>
          </div>
          {/*
          <p id='votes' className='voting-counter-sum'>
            {sumcounter}
          </p>
*/}
          <div>
         
            <img
              onClick={downvote}
              src={downvoteimage}
              className='voting-button'
              id='downvotebutton'
            />
            <Link className='linkblack' to={`/downvoter/${Suggestion.item._id}`}>
              <p id='downvotes' className=' voting-counter-upanddown '>
                {downvotecounter}
              </p>
            </Link>
          </div>
        </div>

        <div className='comments-div'>
          <Link to={`/neuste-kommentare/${Suggestion.item._id}`}>
            <img src={require('./img/comments.svg')} className='comments-img' />
            <span className='comments-counter'>
              {' '}
              {Suggestion.item.comments}
            </span>{' '}
          </Link>
        </div>

        <Link
          to='/teilen'
          state={{ url: '/geteilter-antrag/' + Suggestion.item._id }}
        >
          {' '}
          <img src={require('./img/share.svg')} className='share-button' />
        </Link>
      </div>
      <div className='divider-horizontal-rule'>
        <div className='black-hr'></div>
      </div>
    </div>
  );
};
