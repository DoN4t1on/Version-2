
import { NavbarBottom } from "./NavbarBottom";
import { Link } from "react-router-dom";



export const Search = () => {






	return (
		<div >

			<div className="search-header">

				<div className="search-title">

					<input className="search-input" placeholder="   Suche" />
				</div>

				<p className="search-settings"><Link to="">Profile </Link> | <Link to="">Anträge </Link> | <Link to="">Crowdfundingkampagnen</Link></p>
			</div>
			<NavbarBottom classstart="under-navitem-unselected" classsearch="under-navitem-selected" classactivity="under-navitem-unselected" classprofile="under-navitem-unselected" />
		</div>
	)

}