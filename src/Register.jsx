//import useState, useNavigate, Link, useAuth
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "./AuthContext";

//create a state to store error messages
//create a function to take care of submission form
//get the username and password from the form
//try to register with info
//if successful navigate to the home page
//if it fails save the error message
//return the form with error message and a link to login
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    setError(null);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <Link to="/login">You already have an account. Log in here.</Link>
    </>
  );
}

//easy! basically the same as login
