
import { Petition } from "./Petition";
import { NavbarBottom } from "./NavbarBottom";
import Spielplatz from "./img/playground_petition.jpg";
import Parkbank from "./img/bench.jpg";
import Sportplatz from "./img/sportsfield.jpg";
import Radweg from "./img/bikeway.jpg";
import { Link } from "react-router-dom";
import Header from './components/Header';

export const PetitionsAccepted = () => {


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

      </div>

      <div className='campaigns no-data'>In diesem Gebiet befinden sich noch keine akzeptierten Anträge. Wir sind bereits im Dialog mit der öffentlichen Verwaltung. Gerne können Sie diese auch persönlich kontaktieren.</ div>
      <NavbarBottom
        classstart='under-navitem-selected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );

}
