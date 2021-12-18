function findAuthorById(authors, id) {
  let authorId = authors.find((author) => author.id === id)
  return authorId
}

function findBookById(books, id) {
  let bookId = books.find((book) => book.id === id)
  return bookId
}

function partitionBooksByBorrowedStatus(books) {
  const getNonReturnedBooks = (books) => {
  return books.filter((book) => book.borrows.some((id) => !id.returned));
};
  const getReturnedBooks = (books) => {
  return books.filter((book) => book.borrows.every((id) => id.returned));
};
 let allBooks = []
 allBooks.push(getNonReturnedBooks(books))
 allBooks.push(getReturnedBooks(books))
 return allBooks
}

function getBorrowersForBook(book, accounts) {
  const idsInBook = book.borrows
  const allIds = []
  for (let i = 0; i < idsInBook.length; i++) {
    let borrowsId = idsInBook[i].id
  const idsInformations = accounts.find((account) => account.id === borrowsId)
    idsInformations['returned'] = idsInBook[i].returned
    allIds.push(idsInformations)
  }
  return allIds.slice(0, 10)
  }
 

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
