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

//send a patch request to the server to update a books availability
//attach the users token in the headers to show they are logged in
//return the updated book
async function updateAvailability(token, id, available) {
  const response = await fetch(API + "/books/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ available: available }),
  });
  const result = await response.json();
  return result.book;
}

//create a function that reserves a book for a logged in user
export async function reserveBook(token, id) {
  return await updateAvailability(token, id, false);
}

//create a function to return a book the user has reserved
export async function returnBook(token, id) {
  return await updateAvailability(token, id, true);
}

//after consulting friends i realized my old code, reservebook and returnbook both had the full fetch request
//written out, now they both just call the same function with different values
