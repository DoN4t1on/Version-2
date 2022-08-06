import { Link } from 'react-router-dom';
import { useState } from 'react';

import pinimageempty from './img/pin.svg';
import pinimagefull from './img/pin-fill.svg';

import { ProgressBar } from 'react-bootstrap';

export const Crowdfundingcampaign = (props) => {
  const [pinimage, setPinimage] = useState(pinimageempty);

  const mark = () => {
    if (pinimage == pinimageempty) {
      setPinimage(pinimagefull);
    }
    if (pinimage == pinimagefull) {
      setPinimage(pinimageempty);
    }
  };

  const [donators, setDonators] = useState(0);

  const [amount, setAmount] = useState();

  const [donation, setDonation] = useState(0);

  const [percentage, setPercentage] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (donators == 0) {
      setDonators(1);
    }

    setDonation((prevState) => prevState + Number(amount));

    setAmount('');
  };

  return (
    <div>
      <div className='crowdfunding-campaign'>
        <div className='campaign-header'>
          <Link to='/karte'>
            <button className='btn btn-success button small'>
              <img
                className='location-marker'
                src={require('./img/location.svg')}
              />
              (Distanz)
              <img className='clock' src={require('./img/clock-fill.svg')} />
              (Zeit)
            </button>
          </Link>
          <center>
            <Link to='/melden'>
              <img
                className='report-crowdfunding-campaign'
                src={require('./img/three-dots.svg')}
              />
            </Link>
          </center>
          <img
            className='marker-image-crowdfunding'
            id='marker-svg'
            src={pinimage}
            onClick={mark}
          />
        </div>

        <p id='crowdfunding-titel'>{props.crowdfundingtitel}</p>
        <br />

        <img src={props.crowdfundingpicture} className='petition-picture' />

        <br />
        <br />

        <p className='crowdfunding-description'>
          {props.crowdfundingbeschreibung}{' '}
        </p>

        <ProgressBar className='donation-bar ' now={30} />
        <p className='moneyprogress'>
          <span id='Donated'>{donation}</span>€ von (geforderter Betrag)
        </p>

        <Link className='linkblack donors' to='/spender'>
          {donators} Spender
        </Link>

        <form onSubmit={handleSubmit}>
          <p className='amount-p'>
            <input
              type='number'
              min='1'
              class='amount'
              placeholder='Betrag'
              value={amount}
              id='input'
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
            Spenden
          </button>
        </form>
        <br />

        <Link to='/teilen'>
          <img
            src={require('./img/share.svg')}
            className='share-crowdfunding'
            alt=''
          />
        </Link>
      </div>
      <div className='divider-horizontal-rule'>
        <hr />
      </div>
    </div>
  );
};
