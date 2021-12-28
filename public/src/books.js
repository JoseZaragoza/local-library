function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let result = [];
  let checkedOut = books.filter((book) => book.borrows[0].returned === false);
  let returned = books.filter((book) => book.borrows[0].returned === true);
  result.push(checkedOut, returned);
  return result;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  book.borrows.map((borrowed) => {
    let account = accounts.find((ele) => ele.id === borrowed.id);
    account.returned = borrowed.returned;
    result.push(account);
  });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
