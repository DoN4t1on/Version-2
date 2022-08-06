
import { NavbarBottom } from "./NavbarBottom";

import { Link } from "react-router-dom";

export const Donators = () => {


	return (
		<div >


			<div className="casual-header-div">
				<h4 className="headline">Spenden</h4>
			</div>

			<div className="casual-menu">
				<p className="supporter-list" ><Link to="/profil" className="linkblack"   ><img src={require('./img/profile.png')} className="supporter-list-image" /> (Name)</Link> - (Betrag) <span className="time-supported" >(Zeit)</span> </p>
				<p className="supporter-list anonymous-support " >Anonym - (Betrag) <span className="time-supported" >(Zeit)</span></p>
				<p className="supporter-list" ><img src={require('./img/profile.png')} style={{ visibility: "hidden" }} className="supporter-list-image" /><Link to="/profil" className="linkblack"  > (Name)</Link> - (Betrag) <span className="time-supported">(Zeit)</span></p>
			</div>


			<NavbarBottom classstart="under-navitem-selected" classsearch="under-navitem-unselected" classactivity="under-navitem-unselected" classprofile="under-navitem-unselected" />
		</div >
	)

}