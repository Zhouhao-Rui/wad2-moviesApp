import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../../globals/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./siteHeader.css";

import SideBar from "../sidebar";

const SiteHeader = ({ history }) => {

  return (
    <nav className="navbar fixed-top navbar-light bg-dark">
      <nav className="navbar-brand text-white">
        <SideBar />
      </nav>
      <FontAwesomeIcon
        className="navbar-text text-light"
        icon={["fas", "video"]}
        size="3x"
      />
      <span className="navbar-text text-light">
        For the movie enthusiast !!
      </span>
      <FontAwesomeIcon
        className="navbar-text text-light"
        icon={["fas", "film"]}
        size="3x"
      />
      <nav className="navbar navbar-expand ">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/movies/upcoming">
              Upcoming
            </Link>
          </li>
          <li className="nav-item">
            <Link data-cy="favorite" className="nav-link text-white" to="/movies/favorites">
              Favorites
            </Link>
          </li>
          {/* 
            if user is not authorized, it will show the signin Link
          */}
          {
            !window.localStorage.getItem("username") &&
            <>
              <li>
                <Link data-cy="signin" className="nav-link text-white" to="/signin">
                  signin
                </Link>
              </li>
            </>
          }
          {/* 
            if user is authorized, it will show the logout and profile link
          */}
          {window.localStorage.getItem("username") &&
          <>
            <li>
              <Link data-cy="profile" className="nav-link text-white" to="/profile">
                profile
              </Link>
            </li>
            <li className="nav-item">
              <p data-cy="logout" className="nav-link text-white" onClick={() => {window.localStorage.removeItem("username"); history.go(0)}} style={{ cursor: "pointer" }}>
                logOut
            </p>
              </li>
            </>
          }
        </ul>
      </nav>
    </nav>
  );
};

export default withRouter(SiteHeader);