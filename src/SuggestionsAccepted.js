import { Suggestion } from './Suggestion';
import { NavbarBottom } from './NavbarBottom';
import Spielplatz from './img/playground_Suggestion.jpg';
import Parkbank from './img/bench.jpg';
import Sportplatz from './img/sportsfield.jpg';
import Radweg from './img/bikeway.jpg';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
export const SuggestionsAccepted = () => {
  const { locationName, lat, long } = useSelector((state) => state.Geo);

  return (
    <div>
      <div id='header'>
        <p className='location' id='location'>
        {' '}
          <img class='location-icon' src={require('./img/geo-alt-fill.svg')} />{' '}
          {' '}
          Köln
        </p>

        <p className='menu1 small-headlines'>
          {' '}
          <Link className='strong' to='/'>
            Anträge
          </Link>{' '}
          | <Link to='/crowdfunding' className='grey'>Crowdfunding</Link>
        </p>
        <p className='menu2 small-headlines '>
          {' '}
          <Link to='/' className='grey'>
            Aktiv{' '}
          </Link>
          |
          <Link to='/antrage-akzeptiert' className='strong'>
            {' '}
            Akzeptiert{' '}
          </Link>
          |{' '}
          <Link to='/antrage-abgelehnt' className='grey'>
            Abgelehnt{' '}
          </Link>{' '}
        </p>
      </div>

      <div className='campaigns no-data'>
        In diesem Gebiet befinden sich noch keine akzeptierten Anträge. Wir sind aber
        bereits im Dialog mit der lokalen Verwaltung für eine Ratsversammlung. Gerne können Sie
        diese auch persönlich kontaktieren.
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
