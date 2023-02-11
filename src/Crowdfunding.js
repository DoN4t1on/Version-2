import { NavbarBottom } from './NavbarBottom';
import { Link } from 'react-router-dom';

import { Crowdfundingcampaign } from './Crowdfundingcampaign';

import Spielplatz from './img/playground_Suggestion.jpg';
import Radweg from './img/bikeway.jpg';
import Bunker from './img/bunker.jpg';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { NavbarTop } from './NavbarTop';
export const Crowdfunding = () => {
  const { locationName, lat, long } = useSelector((state) => state.Geo);

  return (
    <div>
      <NavbarTop crowdfunding={true} suggestions_active={true} newest={true}/>

      <div className=' no-data-crowdfunding'>
        In diesem Gebiet befinden sich noch keine Crowdfundingkampagnen. Wir
        sind aber bereits im Dialog mit der Kämmerei. Gerne
        können Sie diese auch persönlich kontaktieren.
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
