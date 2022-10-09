import React from 'react';
import { withRouter } from  'react-router';

function Home(props) {
    const renderBookList = category => {
        const { books } = props;
        return books.filter(book => book.shelf === category)
            .map(book => props.renderBook(book))
    }

    const renderCategory = (name, category) => {
        const bookInCategory = renderBookList(category);

       return bookInCategory.length ? (
                <div className="bookShelf">
                    <h2 className="bookShelf-title">{name}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {bookInCategory}                
                        </ol>
                    </div>
                </div>
            ) : null;

    }

    return (
        <div className="home-page">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                    <div className='current-reading'>
                        {renderCategory('Currently Reading', 'currentlyReading')}
                    </div>
                    <div className="want-to-read">
                        {renderCategory('Want to Read', 'wantToRead')}
                    </div>
                    <div className="read">
                        {renderCategory('Read', 'read')}
                    </div>
                </div>
            </div>
            <div className="open-search">
                <button onClick={() => props.history.push('/search')} />
            </div>
        </div>
    )
}

export default withRouter(Home);