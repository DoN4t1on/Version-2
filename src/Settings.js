import { NavbarBottom } from './NavbarBottom';
import { Link } from 'react-router-dom';

import { localStorageData, Logout } from './services/auth/localStorageData';
import { useNavigate } from 'react-router-dom';
export const Settings = () => {
  let navigate = useNavigate();
  return (
    <div>
      <div className='casual-header-div '>
        <Link to='/dein-profil'>
          {' '}
          <img
            className='back-button'
            src={require('./img/arrow-left-short.svg')}
          />{' '}
        </Link>
        <h4 className=' headline headline-with-back-button '> Einstellungen </h4>
      </div>

      <div className='casual-menu'>

        {/* <Link to='/teilen'>
          {' '}
          <button className='btn btn-success btn-lg button border-black'>
            Freunde einladen 👥
          </button>
        </Link>
        
        {' '} */}

        <a href='https://Lokalspende.org/fragen/'>
          {' '}
          <button className='btn btn-success btn-lg button border-black'>
            Fragen ⁉️
          </button>{' '}
        </a>{' '}
        <br /> <br />
        <a href='https://Lokalspende.org/kontakt/'>
          {' '}
          <button className='btn btn-success btn-lg button border-black'>
            Kontaktiere uns 📩
          </button>{' '}
        </a>
        <br /> <br />

        <a href='https://donorbox.org/localdonation'>
          {' '}
          <button className='btn btn-success btn-lg button border-black'>
            Unterstütze uns mit einer Spende! 💸
          </button>{' '}
        </a>
        <br /> <br />
        <a href='https://t.me/LocalDonation'>
          {' '}
          <button className='btn btn-success btn-lg button border-black'>
            Werde Teil des Teams 🙌🏻
          </button>{' '}
        </a>
        <div className='horzontal-rule-setting'>
          <hr />
        </div>

        {localStorageData('_id') != '' ? (
          <button
            className='btn btn-success btn-lg button border-black'
            type='submit'
            id='Donate'
            onClick={() => {
              Logout();
              navigate('/');
            }}
          >
            Ausloggen
          </button>
        ) : (
          ''
        )}
        <br />
        <br />
        <p>
          {' '}
          <Link className='black' to='/impressum'>
            <strong>Impressum</strong>{' '}
          </Link>
        </p>
        <p>
          {' '}
          <Link className='black' to='/datenschutz'>
            <strong>Datenschutzerklärung</strong>
          </Link>
        </p>
        <p>
          {' '}
          <Link className='black' to='/agb'>
            <strong>AGB</strong>
          </Link>
        </p>
      </div>

      <NavbarBottom
        classstart='under-navitem-unselected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );
};
