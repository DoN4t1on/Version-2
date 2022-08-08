
import { NavbarBottom } from "./NavbarBottom";
import { Link } from "react-router-dom";



export const Activity = () => {




  return (
    <div>
      <div className='casual-header-div'>
        <h4 className='headline-activity'>Aktivität</h4>


        <p className="activity" >




          <strong>Meine Anträge</strong>
          <br />


          Meine Kommentare
          <br />




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