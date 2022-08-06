
import { NavbarBottom } from "./NavbarBottom";
import { Link } from "react-router-dom";



export const CrowdfundingActivitySupported = () => {




	return (
    <div>
      <div className='casual-header-div'>
        <h4 className='headline-activity'>Aktivität</h4>

        <Link
          to='/benachrichtigungseinstellungen'
          className='notification-settings-image-link'
        >
          <img
            src={require('./img/notification-settings.svg')}
            className='notification-settings-image'
          />
        </Link>
        <p className='subheader-activity'>
          <Link to='/activity'>Benachrichtigungen</Link>
          <br />
          <Link to='/petitionen-activity'>Petitionen</Link>
          <br />
          <Link
            to='/crowdfunding-activity'
            className='crowdfundingcampaigns-activity'
          >
            <strong>Crowdfundingkampagnen</strong>
          </Link>
        </p>
        <p className='activity-further-selectors'>
          {' '}
          <Link to='/crowdfunding-activity'>Markiert</Link> |{' '}
          <Link to='/crowdfunding-activity-supported'>
            <strong>Unterstützt</strong>
          </Link>
        </p>
      </div>

      <NavbarBottom
        classstart='under-navitem-unselected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-selected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );

}