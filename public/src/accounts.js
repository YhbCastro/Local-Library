function findAccountById(accounts, id) {
  let accountForThatId = accounts.find((account) => account.id === id)
  return accountForThatId
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => 
    accountA.name.last > accountB.name.last ? 1 : -1
 )
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  const checkId = account.id
  return books.filter((book) => {
    let idsInBook = book.borrows
    return idsInBook.find((id) => id.id === checkId) != null
  }).length
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id
  const booksAccountHas = books.filter((book) => {
    let bookBorrows = book.borrows
    return bookBorrows.find((borrow) => borrow.id === accountId && borrow.returned === false) != null
  })
  return booksAccountHas.map((book) => {
    book['author'] = authors.find((author) => author.id === book.authorId)
    return book
  })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
