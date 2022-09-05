
import { NavbarBottom } from "./NavbarBottom";
import { Link } from "react-router-dom";



export const Search = () => {






	return (
		<div >

			<div className="search-header">

				<div className="search-title">

					<input className="search-input" placeholder="   Suche" />
				</div>


				
			</div>
			<p className="under-work-statement"> Dieser Bereich befindet sich in Arbeit </p>
			<NavbarBottom classstart="under-navitem-unselected" classsearch="under-navitem-selected" classactivity="under-navitem-unselected" classprofile="under-navitem-unselected" />
		</div>
	)

}