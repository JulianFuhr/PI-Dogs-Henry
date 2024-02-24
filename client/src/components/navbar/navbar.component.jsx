import React from "react";
import { Link } from "react-router-dom";

import "./navbar.styles.css";

const NavBar = () => {
  return (
    <nav>
      <div className="container-navbar">
        <ul>
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/create">
            <li>Create dog!</li>
          </Link>
          <Link to="/">
            <li>Exit</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
