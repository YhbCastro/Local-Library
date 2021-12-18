function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => {
    let booksReturn = book.borrows
    return booksReturn.find((account) => account.returned === false) != null
  }).length
}

function getMostCommonGenres(books) {
  // {genre: count}
  const genres = books.map((book) => book.genre)
  // {key: count}
  const genresToCount = genres.reduce((acc, genre) => {
    if(!Object.keys(acc).includes(genre)) {
      acc[genre] = 0;
    }
    acc[genre]++;
    return acc;
  }, {});
  
  // get ordered counts and take the top 5 largest
  // [number] sort desc, take top 5
  const orderedByCounts = Object.keys(genresToCount).map((genre) => 
       genresToCount[genre]
  ).sort().reverse().slice(0, 5);
  
  // {genre: {name: genre, count: number}}
  const orderedResults = orderedByCounts.reduce((acc, count) => {
    // find ALL genres that has this count
    // [genres] with this count
    const genresWithCount = Object.keys(genresToCount).filter((genre) =>
      genresToCount[genre] === count
    )
    // if the genre is already in the list, we should skip it and look for another one
    const genreToAdd = Object.keys(genresToCount).find(genre => 
      !Object.keys(acc).includes(genre) && genresToCount[genre] === count
    )
    
    acc[genreToAdd] = getInfoBlob(genreToAdd,  genresToCount[genreToAdd]);
    return acc;
  }, {});
  // {genre: {name: genre, count: number}}
  return Object.values(orderedResults);
}

function getInfoBlob(name, count) {
  return {name, count}
}

function sortBooksByBorrows(books) {
  return books.sort((bookA, bookB) => bookA.borrows.length < bookB.borrows.length ? 1 : -1);
}

function getMostPopularBooks(books) {
  const sortedBooks = sortBooksByBorrows(books).slice(0,5)
 return sortedBooks.map(book => getInfoBlob(book.title, book.borrows.length))
}

function getMostPopularAuthors(books, authors) {
  const sortedBooks = sortBooksByBorrows(books)
   // {authorID: {name, count}}
  const authorToBorrowsMap = sortedBooks.reduce((acc, book) => {
    const count = book.borrows.length;
    const author = authors.find(author => author.id === book.authorId)
    
    if (Object.keys(acc).includes(book.authorId)) {
      acc[book.authorId].count += count
    } else {
       acc[book.authorId] = getInfoBlob(author.name.first + " " + author.name.last, count)
    }
    return acc;   
  }, {})
  return Object.values(authorToBorrowsMap).sort((blobA, blobB) => blobA.count < blobB.count ? 1 : -1).slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
