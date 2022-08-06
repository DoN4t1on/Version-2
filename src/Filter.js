import * as React from 'react';

import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

import { NavbarBottom } from './NavbarBottom';
import { Link } from 'react-router-dom';

const PrettoSlider = styled(Slider)({
  color: '#28a745',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#28a745',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const marks1 = [
  {
    value: 0,
    label: 'Bezirk',
  },
  {
    value: 25,
    label: 'Stadt',
  },
  {
    value: 50,
    label: 'Bundesland',
  },
  {
    value: 75,
    label: 'Land',
  },
  //  {
  // 	value: 80,
  // 	label: 'Kontinent',
  //  },
  {
    value: 100,
    label: 'Welt',
  },
];

const marks2 = [
  {
    value: 0,
    label: 'Tag',
  },
  {
    value: 25,
    label: 'Woche',
  },
  {
    value: 50,
    label: 'Monat',
  },
  {
    value: 75,
    label: 'Jahr',
  },
  {
    value: 100,
    label: 'Alles',
  },
];

export const Filter = () => {
  return (
    <div>
      <div className='casual-header-div'>
        <h4 className='headline'> Erweiterte Filter</h4>
      </div>

      <div className='casual-menu'>
        <h3>
          <strong>(Setze deinen Standort)</strong>
        </h3>
        <Link to='/karte'>
          {' '}
          <img src={require('./img/marker.svg')} />
        </Link>
        <div className='horzontal-rule-general'>
          <hr />
        </div>

        <h3>
          <strong>Filter-Reichweite: </strong>
        </h3>

        <PrettoSlider
          className='slider'
          aria-label='pretto slider'
          defaultValue={25}
          marks={marks1}
          step={25}
        />
        <div className='horzontal-rule-general'>
          <hr />
        </div>

        <h3>
          <strong>
            <Link to='/abstimmfilter'>
              {' '}
              <img
                className='range-info'
                src={require('./img/info-circle.svg')}
              />
            </Link>{' '}
            Abstimmfilter:{' '}
          </strong>
        </h3>

        <div className='btn-group'>
          <button className='btn btn-success left-menu-filter'>
            Relevante Votes
          </button>

          <button type='button' className='btn btn-success right-menu-filter'>
            <strong>Votes insgesamt</strong>
          </button>
        </div>
        <div className='horzontal-rule-general'>
          <hr />
        </div>

        <h3>
          <strong>
            <Link to='/erstellzeit-filter'>
              {' '}
              <img
                className='range-info'
                src={require('./img/info-circle.svg')}
              />
            </Link>{' '}
            Erstellzeit-Filter:
          </strong>
        </h3>
        <PrettoSlider
          className='slider'
          aria-label='pretto slider'
          defaultValue={25}
          marks={marks2}
          step={25}
        />
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
