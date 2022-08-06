


import { NavbarBottom } from "./NavbarBottom";



export const VotingFilter = () => {


	return (
    <div>
      <div className='casual-header-div'>
        <h4 className='headline'> Abstimmfilter</h4>
      </div>
      <br />
      <div className='casual-menu'>
        <p className='info'>
          „Relevante Votes” sind Votes von Nutzern bei denen der Wohnort
          innerhalb des angesprochenen Verwaltungsbereichs liegt. Es zählen nur
          die relevanten Votes für die Reihenfolge der Einreichung des Projekts.
          „Votes insgesamt” sind Votes aus der ganzen Welt.{' '}
        </p>
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