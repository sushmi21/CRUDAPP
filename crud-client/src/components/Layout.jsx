import React from "react";
import PropTypes from "prop-types";
import NavBar from "./NavBar";

// Basic layout for all pages
const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div style={{ margin: "2rem" }}>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Layout;
