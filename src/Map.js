import { NavbarBottom } from "./NavbarBottom";
import { Link } from "react-router-dom"; 

export const Map = () => {


	return (
		<div >
			<div class="casual-header-div">
				<h4 class="headline">Standort</h4>
			</div>

			<img src={require('./img/map.png')} />
			<NavbarBottom classstart="under-navitem-selected" classsearch="under-navitem-unselected"  classactivity="under-navitem-unselected" classprofile="under-navitem-unselected"/>
		</div>
	)

}
