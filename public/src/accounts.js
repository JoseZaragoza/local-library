function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((lastNameA, lastNameB) =>
    lastNameA.name.last.toLowerCase() < lastNameB.name.last.toLowerCase()
      ? -1
      : 1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let { id } = account;
  return books.reduce((previousValue, currentBook) => {
    let { borrows } = currentBook;
    borrows.map((element) => {
      if (element.id === id) previousValue++;
    });
    return previousValue;
  }, 0);
}

/*
function getTotalNumberOfBorrows(account, books) {
  books.forEach((book) =>
    book.borrows.forEach((borrow) => account.id === borrow.id && totalBorrows++)
  );
  return totalBorrows;
}
*/

function getBooksPossessedByAccount(account, books, authors) {
  const borrowed = books.filter((book) => account.id === book.borrows[0].id);
  borrowed.forEach(
    (book) =>
      (book.author = authors.find((author) => book.authorId === author.id))
  );
  return borrowed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
