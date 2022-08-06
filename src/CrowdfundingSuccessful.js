
import { NavbarBottom } from "./NavbarBottom";
import { Link } from "react-router-dom";

import { Crowdfundingcampaign } from "./Crowdfundingcampaign";

import Spielplatz from "./img/playground_petition.jpg";
import Radweg from "./img/bikeway.jpg";
import Bunker from "./img/bunker.jpg";
import Header from './components/Header';

export const CrowdfundingSuccessful = () => {


	return (
    <div>
      <Header />

      <div className='campaigns'>
        <Crowdfundingcampaign
          crowdfundingtitel='Fahrradweg'
          crowdfundingpicture={Radweg}
          crowdfundingbeschreibung='Doppelspuriger Fahrradweg nach Mühlheim'
        />
        <Crowdfundingcampaign
          crowdfundingtitel='Bunker'
          crowdfundingpicture={Bunker}
          crowdfundingbeschreibung='Bunker für Groß und Klein in Nippes'
        />
        <Crowdfundingcampaign
          crowdfundingtitel='Spielplatz'
          crowdfundingpicture={Spielplatz}
          crowdfundingbeschreibung='Spielplatz mit Kletterspinne und Rutsche'
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

}