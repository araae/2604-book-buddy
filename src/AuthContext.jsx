import { createContext, useContext, useState } from "react";

//create the auth context
const AuthContext = createContext();

//send a post request to the endpoint with email and password
//if a token didnt come back throw an error
//save the token to state
async function authRequest(endpoint, { username, password }, setToken) {
  try {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/" + endpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      },
    );
    const result = await response.json();
    if (!result.token) throw Error(result.message);
    setToken(result.token);
  } catch (e) {
    throw Error(e.message);
  }
}

//create token, login, register, logout
//create a state to store the token
//define login, register, logout, authRequest with the login endpoint
//pass token to all children
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  const login = (credentials) => authRequest("login", credentials, setToken);
  const register = (credentials) =>
    authRequest("register", credentials, setToken);
  const logout = () => setToken(null);

  const value = { token, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//access auth from any component
//throw an error if used outside provider
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within AuthProvider");
  return context;
}
