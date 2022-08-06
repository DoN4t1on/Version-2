
import { NavbarBottom } from "./NavbarBottom";
import { Comment } from "./Comment";

import { Link } from "react-router-dom";

export const CommentsMostPopular = () => {


	const handleSubmit = (e) => {
		e.preventDefault();
		
	

	      };
	
	return (

		<div >
			<div className="casual-header-div">
				<div className="comments-header">
					<h4>Kommentare (0)</h4>
					<p>
						<Link to="/neuste-kommentare">Neuste</Link> | <Link to="/beliebteste-kommentare"><strong>Beliebtest</strong></Link>
					</p>
				</div>
			</div>

			<div className="comment-menu">
			

			<Comment comment="🔝🔝🔝" />
			</div>


			<form onSubmit={handleSubmit}>
				<div className="comment-bar">
					<input type="text" className="comment-input" placeholder="Kommentieren" required/>
					<button type="submit" className="btn btn-ghost-light comment-button">
						<img className="comment-image" src={require('./img/send-comment.svg')} />
					</button>
				</div>

			</form>


			<NavbarBottom classstart="under-navitem-selected" classsearch="under-navitem-unselected"  classactivity="under-navitem-unselected" classprofile="under-navitem-unselected"/>
		</div >
	)

}