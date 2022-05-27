import React from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../supabase";

export default function NavBar(props) {
  const _handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      props.setIsLoggedIn(false);
    }
    console.log(error);
  };

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
      {props.isLoggedIn ? (
        <button onClick={_handleLogout}>Log Out</button>
      ) : (
        <button>Login</button>
      )}
    </nav>
  );
}
