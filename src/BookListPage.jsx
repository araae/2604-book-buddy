//import useState, useEffect, Link, getBooks
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getBooks } from "./book";

//create a state to store the books
//get all books from the API when the component loads
//return a list of books with links to their detail pages
export default function BookListPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data ?? []);
    };
    fetchBooks();
  }, []);

  return (
    <>
      <h1>Catalog</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={"/books/" + book.id}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
