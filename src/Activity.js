
import { NavbarBottom } from "./NavbarBottom";
import { Link } from "react-router-dom";



export const Activity = () => {




  return (
    <div>
      <div className='casual-header-div'>
        <h4 className='headline'>Aktivität</h4>


      </div>
      <p className="under-work-statement"> Dieser Bereich befindet sich in Arbeit </p>
      <NavbarBottom
        classstart='under-navitem-unselected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-selected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );

}