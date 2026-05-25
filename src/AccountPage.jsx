import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "./AuthContext";
import { getUser, getReservations, returnBook } from "./book";

//create a state to store the user, reservations and error messages

//get the user info and reservations from the API
export default function AccountPage() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  //if user is not logged in show links to register or log in
  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      const userData = await getUser(token);
      const reservationData = await getReservations(token);
      setUser(userData);
      setReservations(reservationData);
    };
    fetchData();
  }, [token]);

  if (!token) {
    return (
      <>
        <p>You are not logged in.</p>
        <Link to="/register">Register</Link>
        <Link to="/login">Log in</Link>
      </>
    );
  }

  //create a function to return a book
  //remove the returned book from the reservations list
  //if return fails save the error message
  //return the user info and list of reservations with a return button
  const tryReturn = (id) => {
    setError(null);
    returnBook(token, id)
      .then(() => setReservations(reservations.filter((r) => r.bookId !== id)))
      .catch((e) => setError(e.message))
      .finally(() => {}); //this is empty and doesnt do anything i guess
  };
  //idk if this is unecessary but my friend just told me about this method so i wanted to include it in haha but it feels like way more code

  return (
    <>
      <h1>My Account</h1>
      {user && (
        <p>
          {user.firstname} {user.email}
        </p>
      )}
      <h2>My Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {reservation.book.title}
            <button onClick={() => tryReturn(reservation.bookId)}>
              Return
            </button>
          </li>
        ))}
      </ul>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
