import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Suggestions } from './Suggestions';

export const NavbarTop = (props) => {

    const selected_class = "tab-bar-selected"
    const unselected_class = "tab-bar-unselected"

    return (
        <div id='header'>
          <div class="header-row">
            <div>
              <img src={require("./img/localsuggestion_icon.svg")}></img>
            </div>
            <div>
              <h2 style={{marginBottom: "0", marginLeft: "10px"}}>
              LOKALESPENDE
              </h2>
            </div>
          </div>
          {/* <div className='location' id='location'>
            <img class='location-icon' src={require('./img/geo-alt-fill.svg')} />{' '}
            {' '}
            Köln
          </div> */}
          <h1>Lokale Projekte in Köln</h1>
          <div>
            <input class="header-search-input" placeholder='Suche'></input>
          </div>
          <div class="filters">
            <div className='tab-bar-menu small-headlines'>
              <Link className={`${props.suggestions ? selected_class : unselected_class}`} to='/'>
                Anträge
              </Link>
              {' '}
              <Link className={`${props.crowdfunding ? selected_class : unselected_class}`} to='/crowdfunding'>Crowdfunding</Link>
            </div>
            <div className='tab-bar-menu small-headlines '>
              <Link to='/' className={`${props.suggestions_active ? selected_class : unselected_class}`}>
                Aktiv{' '}
              </Link>
              <Link to='/antrage-akzeptiert' className={`${props.suggestions_accepted ? selected_class : unselected_class}`}>
                Akzeptiert
              </Link>
              {' '}
              <Link to='/antrage-abgelehnt' className={`${props.suggestions_denied ? selected_class : unselected_class}`}>
                Abgelehnt
              </Link>
            </div>
            <div className='tab-bar-menu small-headlines'>
              <Link to='/' className={`${props.newest ? selected_class : unselected_class}`}>
                Neuste
              </Link>
              {' '}
              <Link to='/antrage-aktiv-am-beliebtesten' className={`${props.favourites ? selected_class : unselected_class}`}>
                Beliebtest
              </Link>
            </div>
          </div>
        </div>
    )
}