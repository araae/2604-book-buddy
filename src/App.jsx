//import Routes, Route, login and register
import { Routes, Route } from "react-router";
import Login from "./Login";
import Register from "./Register";

//define all routes
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
