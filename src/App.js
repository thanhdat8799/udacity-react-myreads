import React, { useState, useEffect } from 'react'
import './App.css'
import Home from "./components/home/home.component";
import Search from './components/search/search.component';
import { getAll} from "./BooksAPI";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BookItem from './components/book-item/book-item.component';

function BooksApp(props) {
  const [books, setBooks] = useState([])

  useEffect(() => {
      const getBookList = async () => await getListOfBooks();
      getBookList().catch(console.error);
  })

  const  getListOfBooks = async () => 
      setBooks(await getAll());

  const renderBook = (book, page = "HOME") =>  
    <BookItem book={book} page={page} books={books} setBooks={setBooks}/>
  
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact>
                  <Home books={books} renderBook={renderBook} />
              </Route>
              <Route path="/search">
                  <Search renderBook={renderBook} />
              </Route>
          </Switch>
      </BrowserRouter>
  )
}


export default BooksApp