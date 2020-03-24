import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

// NavBar Component
const NavBar = () => {
  return (
    <div>
      <Nav>
        <NavItem>
          <NavLink to="/addairport" className="nav-link">
            Add Airport
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/airports" className="nav-link">
            Airports List
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/addairline" className="nav-link">
            Add Airline
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/airlines" className="nav-link">
            Airlines List
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default NavBar;
