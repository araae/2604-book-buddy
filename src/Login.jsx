//import useState, useNavigate, Link, useAuth

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "./AuthContext";

//create a state to store error messages
//create a function to take care of submission form
//get the username and password from the form
//try to log in with info
//if successful navigate to the home page
//if it fails save the error message
//return the form with error message and a link to register
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const tryLogin = async (formData) => {
    setError(null);

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Log in to your account</h1>
      <form action={tryLogin}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <Link to="/register">Do you need an account? Register here.</Link>
    </>
  );
}

//i think im realizing a bit too late that i shouldve created an auth folder for login and register
