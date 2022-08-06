
import { NavbarBottom } from "./NavbarBottom";

import { Link } from "react-router-dom";

export const Info = () => {


	return (
    <div>
      <div className='casual-header-div'>
        <h4 className='headline'>Info</h4>
      </div>
      <div className='casual-menu'>
        <Link style={{ color: 'black' }} to='/impressum'>
          {' '}
          <p>
            {' '}
            <strong>Impressum </strong>
          </p>{' '}
        </Link>
        <Link style={{ color: 'black' }} to='/datenschutz'>
          <p>
            {' '}
            <strong>Datenschutzerklärung</strong>
          </p>{' '}
        </Link>

        <Link style={{ color: 'black' }} to='/agb'>
          <p>
            {' '}
            <strong>AGB</strong>
          </p>{' '}
        </Link>

    </div>

      <nav className='nav under-navbar'>
        <Link to='/' className='nav__link under-navitem-unselected'>
          <i
            className='material-icons nav__icon '
            style={{ 'font-size': '35px' }}
          >
            home
          </i>
          <span className='nav__text'>Start</span>
        </Link>
        <Link to='/suche' className='nav__link under-navitem-unselected'>
          <i
            className='material-icons nav__icon '
            style={{ 'font-size': '35px' }}
          >
            search
          </i>
          <span className='nav__text'>Suche</span>
        </Link>
        <Link
          to='/petition-erstellen'
          className='nav__link under-navitem-selected'
        >
          <i
            className='material-icons nav__icon'
            style={{ 'font-size': '55px' }}
          >
            add_circle_outline
          </i>

          <span className='nav__text'></span>
        </Link>
        <Link to='/activity' className='nav__link under-navitem-unselected'>
          <i
            className='material-icons nav__icon '
            style={{ 'font-size': '35px' }}
          >
            bolt
          </i>
          <span className='nav__text'>Aktivität</span>
        </Link>
        <Link to='/dein-profil' className='nav__link under-navitem-unselected'>
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

}