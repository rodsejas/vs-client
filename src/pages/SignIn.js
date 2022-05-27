import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const _handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (!error && user) {
      props.setIsLoggedIn(true);
      navigate("/");
    }
    console.log({ user, session, error });
  };

  return (
    <form onSubmit={_handleSubmit}>
      <label>
        <p>Email address</p>
        <input type="email" onChange={_handleEmailChange} value={email} />
      </label>
      <label>
        <p>Password</p>
        <input
          type="password"
          onChange={_handlePasswordChange}
          value={password}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
