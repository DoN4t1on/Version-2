import { Link, useNavigate } from 'react-router-dom';
import { localStorageData, Logout } from './services/auth/localStorageData';
import { toast } from 'react-toastify';
import CookieConsent from 'react-cookie-consent';

export const NavbarBottom = (props) => {
  let navigate = useNavigate();

  const route = () => {
    if (localStorageData('_id')) {
      navigate('/petition-erstellen');
    } else {
      toast.error('Erstelle ein Konto im Menü „Profil“ um fortzufahren');
    }
  };

  return (
    <div>
      <Link to='/info'>
        <img src={require('./img/info-circle.svg')} className='info-image' />
      </Link>
      <nav className='nav under-navbar'>
        <Link to='/' className={`nav__link ${props.classstart}`}>
          <i
            className='material-icons nav__icon '
            style={{ 'font-size': '35px' }}
          >
            home
          </i>
          <span className='nav__text'>Start</span>
        </Link>
        <Link to='/suche' className={`nav__link ${props.classsearch}`}>
          <i
            className='material-icons nav__icon '
            style={{ 'font-size': '35px' }}
          >
            search
          </i>
          <span className='nav__text'>Suche</span>
        </Link>
        <a
          // to={localStorageData('_id') ? '/petition-erstellen' : '/dein-profil'}
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
        <Link to='/activity' className={`nav__link ${props.classactivity}`}>
          <i
            className='material-icons nav__icon '
            style={{ 'font-size': '35px' }}
          >
            bolt
          </i>
          <span className='nav__text'>Aktivität</span>
        </Link>
        <Link to='/dein-profil' className={`nav__link ${props.classprofile}`}>
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
