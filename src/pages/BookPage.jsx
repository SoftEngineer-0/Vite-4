import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookComponent } from './BookComponent';
import { NotFound } from './NotFound';
import { Helmet } from 'react-helmet';
import { LoadingEffect } from './LoadingEffect';

export function BookPage() {
  const [BooksDB, setBooksDB] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const { bookId } = useParams();

  const getBooks = async () => {
    try {
      setBooksDB(window.BooksDB);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Mark loading as false when the operation is complete
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <Helmet>
          <title>Loading...</title>
        </Helmet>
        <LoadingEffect />
      </div>
    );
  }

  // Find the book that matches bookId
  const foundBook = BooksDB.find((book) => book.id === bookId);

  if (!foundBook) {
    return (
      <div className="container">
        <Helmet>
          <title>InQuill - Book</title>
        </Helmet>
        <NotFound msg="Book Not Found." />
      </div>
    );
  }

  // Destructure the book properties
  const { cover, title, desc, author, sale, path } = foundBook;

  return (
    <div className="container">
      <Helmet>
        <title>InQuill - Book</title>
      </Helmet>
      <BookComponent
        id={bookId}
        cover={cover}
        title={title}
        desc={desc}
        author={author}
        sale={sale}
        path={path}
      />
    </div>
  );
}
