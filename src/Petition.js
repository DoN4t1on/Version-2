import { useState, useEffect } from 'react';
import upvoteempty from './img/arrow-up.svg';
import upvotefull from './img/arrow-up-fill.svg';
import downvoteempty from './img/arrow-down.svg';
import downvotefull from './img/arrow-down-fill.svg';
import pinimageempty from './img/pin.svg';
import pinimagefull from './img/pin-fill.svg';
import { Link } from 'react-router-dom';
import { ImageEndPoint } from './config/config';
import { localStorageData, Logout } from './services/auth/localStorageData';
import ErrorService from './services/formatError/ErrorService';
import userServices from './services/httpService/userAuth/userServices';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';
import Grid from '@mui/material/Grid';



export const Petition = (petition) => {
  const localtz = moment.tz.guess();
  const [sumcounter, setSumcounter] = useState(
    petition.item.upVote - petition.item.downVote
  );

  const [upvotecounter, setUpvotecounter] = useState(petition.item.upVote);

  const [downvotecounter, setDownvotecounter] = useState(
    petition.item.downVote
  );

  const [upvoteimage, setUpvoteimage] = useState(upvoteempty);

  const [downvoteimage, setDownvoteimage] = useState(downvoteempty);

  useEffect(() => {
    petition.item.downvotes.map((item) => {
      if (item.userId == localStorageData('_id')) {
        setDownvoteimage(downvotefull);
      }
    });
    petition.item.upvotes.map((item) => {
      if (item.userId == localStorageData('_id')) {
        setUpvoteimage(upvotefull);
      }
    });
  }, []);

  const [pinimage, setPinimage] = useState(pinimageempty);

  const [supporters, setSupporters] = useState(petition.item.bidder);

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
        setUpvotecounter(res.data.data.upVote);
        setDownvotecounter(res.data.data.downVote);
        setSumcounter(res.data.data.upVote - res.data.data.downVote);
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

        setUpvotecounter(res.data.data.upVote);
        setDownvotecounter(res.data.data.downVote);
        setSumcounter(res.data.data.upVote - res.data.data.downVote);

        //// getComments.refetch();
        /// navigate('/');
      },
    }
  );

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
        postId: petition.item._id,
        timeZone: localtz,
        dateTime: new Date(),
      });
    } else {
      toast.error('Erstelle ein Konto im Menü „Profil“ um fortzufahren');
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
        postId: petition.item._id,
        timeZone: localtz,
        dateTime: new Date(),
      });
    } else {
      toast.error('Erstelle ein Konto im Menü „Profil“ um fortzufahren');
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
        postId: petition.item._id,
        amount: amount,
        timeZone: localtz,
        dateTime: new Date(),
      });
      setAmount('');
    } else {
      toast.error('Erstelle ein Konto im Menü „Profil“ um fortzufahren');
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
            name: 'petetion',
            Id: petition.item._id,

            link: `https://app.lokalpetition.de/geteilter-antrag/${petition.item._id}`,
          }}
        >
          {' '}
          <img src={require('./img/three-dots.svg')} className='report' />{' '}
        </Link>
        <div>
          <Link to={`/profil/${petition.item.user._id}`}>
            {petition.item.user != '' ? (
              <button className='btn btn-success button small'>
                <span className='petition-creator-name'>
                  {petition.item.user.fname}
                </span>
                <img
                  src={
                    petition.item.user.pic
                      ? ImageEndPoint + petition.item.user.pic
                      : require('./img/profile.png')
                  }
                  className='profile-picture'
                />
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
      <br />
      <p id='petition-titel'> {petition.item.title} </p>

      <img
        src={ImageEndPoint + petition.item.pic}
        className='petition-picture'
      />

      <br />

      <Grid container spacing={2}>
        <Grid item lg={3} md={3} sm={1} xs={1} />
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <p className='petition-desc'> {petition.item.description} </p>
        </Grid>
      </Grid>

      <p id='donation-statements'> Spendenzusagen: </p>

      <Link
        to={`/spendenzusagen/${petition.item._id}`}
        id='Supporters'
        className='unterstützer-link'
      >
        {supporters}
      </Link>
      <p id='your-donation'> Ihre Spendenzusage: </p>
      <form onSubmit={handleSubmit}>
        <p className='amount-p'>
          <input
            type='number'
            min='1'
            value={amount}
            className='amount'
            id='inputAmount'
            placeholder='Betrag'
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
          <span id='euros'>,00€</span>
        </p>

        <button
          className='btn btn-success btn-lg button'
          type='submit'
          id='Donate'
        >
          Spende zusagen
        </button>
      </form>
      <br />

      <div className='interaction-bar'>
        <div className='voting-div'>
          <div>
            {' '}
            <img
              onClick={upvote}
              src={upvoteimage}
              className='voting-button'
              id='upvotebutton'
            />
            <Link className='linkblack' to={`/upvoter/${petition.item._id}`}>
              <p id='upvotes' className='voting-counter-upanddown '>
                {upvotecounter}
              </p>
            </Link>
          </div>

          <p id='votes' className='voting-counter-sum'>
            {sumcounter}
          </p>

          <div>
            {' '}
            <img
              onClick={downvote}
              src={downvoteimage}
              className='voting-button'
              id='downvotebutton'
            />
            <Link className='linkblack' to={`/downvoter/${petition.item._id}`}>
              <p id='downvotes' className=' voting-counter-upanddown '>
                {downvotecounter}
              </p>
            </Link>
          </div>
        </div>

        <div className='comments-div'>
          <Link to={`/neuste-kommentare/${petition.item._id}`}>
            <img src={require('./img/comments.svg')} className='comments-img' />
            <span className='comments-counter'>
              {' '}
              {petition.item.comments}
            </span>{' '}
          </Link>
        </div>

        <Link to='/teilen' state={{ id: petition.item._id }}>
          {' '}
          <img src={require('./img/share.svg')} className='share-button' />
        </Link>
      </div>
      <div className='divider-horizontal-rule'>
        <hr />
      </div>
    </div>
  );
};
