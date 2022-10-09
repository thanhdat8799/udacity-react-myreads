import React, { useState } from 'react';
import { withRouter } from 'react-router';
import {search} from  '../../BooksAPI';



function Search ({renderBook, history}) {

    const [books, setBooks] = useState([]);

    const searchForBooks =  async element => {
        let elementValue = element.target.value
        if( elementValue ) {
            let searchResponse = []
            searchResponse = await search(elementValue);
            if(searchResponse.error) {
                setBooks([])
            } else 
                setBooks(searchResponse)            
        } else {
            return books ? setBooks([]) : null
        }
    }

    const renderBookList =  () => { 
        return books ?
        books.map(book => renderBook(book, 'SEARCH'))
        : null;
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <button className="close-search" onClick={() => history.push('/')}/>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" autoFocus={true} onChange={e => searchForBooks(e)}/>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {renderBookList()}
                </ol>
            </div>
        </div>
    )
}

export default withRouter(Search);