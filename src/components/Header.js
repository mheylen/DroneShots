import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./header.css";
import { NONAME } from "dns";


class Header extends Component {

  render() {
    return (
      <header>
          <div className= "home">
                < NavLink exact to="/" >
                  Home
                </NavLink>
                </div>
          <div className="pilots">
                <NavLink to="/pilot" activeStyle={{ textDecoration:"none" }}>
                  Pilots 
                </NavLink>
          </div>
      </header>
    );
  }
}



export default connect()(Header);
