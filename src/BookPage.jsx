import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "./AuthContext";
import { getBook, reserveBook } from "./book";

//create a state to store the book
//create a state to store error messages
//get the book from the API with its unique ID
export default function BookPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBook(id);
      setBook(data);
    };
    fetchBook();
  }, [id]);

  //create a function to reserve the book
  //if reservation fails save the error message
  //show loading while book data is being loaded/fetched
  //return the book details and a reserve button for logged in users
  //use the return value of reservebook to set the book state
  const tryReserve = async () => {
    setError(null);
    try {
      const updated = await reserveBook(token, id);
      setBook(updated);
    } catch (e) {
      setError(e.message);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
      {token && (
        <button onClick={tryReserve} disabled={!book.available}>
          Reserve
        </button>
      )}
      {error && <p role="alert">{error}</p>}
    </>
  );
}
