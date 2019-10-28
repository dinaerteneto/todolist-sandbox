import React from "react";
import { NavLink , Router } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Router>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/about">
          Users
        </NavLink>        
      </Router>
    </header>
  );
};

export default Header;
