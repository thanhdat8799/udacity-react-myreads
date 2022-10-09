import React from 'react'
import { get, update } from "../../BooksAPI";

function BookItem({book, page, books, setBooks}) {
    const addBook = async b => {
        const responseBook = await get(b.id);
        return responseBook
    }
  
    const updateBookShelf = async (bookToUpdate, bookList, page) => {
        let flag = true;
        setBooks( books.map(book => {
            if (book.id === bookToUpdate.id) {
                Object.keys(bookList).forEach(shelf => {
                    if (bookList[shelf].includes(book.id)) {
                        book.shelf = shelf;
                        flag = false;
                    }
                });
            }
            return book;
        }));
  
        if (flag) {
            if (page === "HOME") {
                setBooks(books.filter((item) => item.id !== bookToUpdate.id))
            } else {
                const newBook = await addBook(bookToUpdate)
                books.push(newBook);
            }
        }
  
        setBooks(books)
    };

    const getBookShelf = book => {
        let bookShelf = 'none';
        books.forEach((b) => {
            if (book.id === b.id) {
                bookShelf = b.shelf;
            }
        });
        return bookShelf;
    }
    const moveBookToOtherCategory = async (element, book, page) => {
      const bookList = await update(book, element.target.value);
      updateBookShelf(book, bookList, page);
    }


    return (
        <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ""})`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={e => moveBookToOtherCategory(e, book, page)} value={getBookShelf(book)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading" disabled={book.shelf === "currentlyReading"}>Currently Reading</option>
                                <option value="wantToRead" disabled={book.shelf === "wantToRead"}>Want to Read</option>
                                <option value="read" disabled={book.shelf === "read"}>Read</option>
                                <option value="none" disabled={!book.shelf || book.shelf === ""}>None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
                </div>
            </li>
        )
}

export default BookItem