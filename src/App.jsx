//import Routes, Route, and all page components
import { Routes, Route } from "react-router";
import Navbar from "./Navbar";
import BookListPage from "./BookListPage";
import BookPage from "./BookPage";
import AccountPage from "./AccountPage";
import Login from "./Login";
import Register from "./Register";

//define all routes for the app
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
