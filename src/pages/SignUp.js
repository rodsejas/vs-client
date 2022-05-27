import React from "react";
import { useState } from "react";
import { supabase } from "../supabase";

export default function Login() {
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
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
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
      <button type="submit">Sign Up</button>
    </form>
  );
}
