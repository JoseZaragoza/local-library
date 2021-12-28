function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((previousValue, currentBook) => {
    let { borrows } = currentBook;
    if (borrows[0].returned === false) previousValue++;
    return previousValue;
  }, 0);
}

/*
Solution without reduce:

function getBooksBorrowedCount(books) {
  let borrowedBooks = books.filter(book => book.borrows[0].returned === false);
  return borrowedBooks.length;
}
*/

//helper function
let _helper = function (element) {
  element.sort((obj1, obj2) => (obj1.count > obj2.count ? -1 : 1));
};

function getMostCommonGenres(books) {
  let result = [];
  books.forEach((book) => {
    let created = result.findIndex((genreObj) => genreObj.name === book.genre);
    //check to see if object is already created
    if (created > 0) {
      result[created].count++;
    } else {
      //else push in the whole new object
      result.push({ name: book.genre, count: 1 });
    }
    _helper(result);
  });
  return result.slice(0, 5);
}

function getMostPopularBooks(books) {
  let borrowed = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  _helper(borrowed);
  return borrowed.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let counts = {};
  let result = [];
  authors.forEach((author) => {
    books.forEach((book) => {
      if (author.id === book.authorId) {
        let name = `${author.name.first} ${author.name.last}`;
        let current = counts[name];
        if (current) {
          counts[name] = current + book.borrows.length;
        } else {
          counts[name] = book.borrows.length;
        }
      }
    });
  });
  for (let item in counts) {
    result.push({ name: item, count: counts[item] });
    _helper(result);
  }
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
