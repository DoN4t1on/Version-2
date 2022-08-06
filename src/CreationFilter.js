
import { NavbarBottom } from "./NavbarBottom";



export const CreationFilter = () => {


	return (

		<div >
			<div className="casual-header-div">
				<h4 className="headline"> Erstellzeit-Filter </h4>
			</div>
			<div className="casual-menu"   >
				<br />
				<p className="info">Filtert Petitionen und Crowdfundingkampagnen nach der Zeit wann sie erstellt wurden.</p>
			</div>
			<NavbarBottom classstart="under-navitem-selected" classsearch="under-navitem-unselected" classactivity="under-navitem-unselected" classprofile="under-navitem-unselected"/>
		
		</div >
	)


}