import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/equipments">
        <span>Equipment || </span>
      </NavLink>
      <NavLink to="/workers">
        <span>Workers || </span>
      </NavLink>
      <NavLink to="/inspections">
        <span>Inspections || </span>
      </NavLink>
      <NavLink to="/models">
        <span>Models</span>
      </NavLink>
    </nav>
  );
}
