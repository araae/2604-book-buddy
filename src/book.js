// store the base API url
const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

//create a function to get all books from the server
export async function getBooks() {
  const response = await fetch(API + "/books");
  const result = await response.json();
  return result.books;
}

//create a function to get a book using its id
//get a book from the server using its id

export async function getBook(id) {
  const response = await fetch(API + "/books/" + id);
  const result = await response.json();
  return result.book;
}

//create a function that reserves a book for a logged in user
//send a patch request to the server to update the book
//attach the users token in the headers to show they are logged in
//tell user if book is available
export async function reserveBook(token, id) {
  const response = await fetch(API + "/books/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ available: false }),
  });
  const result = await response.json();
  return result.book;
}

//create a function to return a book the user has reserved
//tell the server to mark this book as available again

export async function returnBook(token, id) {
  const response = await fetch(API + "/books/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ available: true }),
  });
  const result = await response.json();
  return result.book;
}
