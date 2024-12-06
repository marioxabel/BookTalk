import { useState } from 'react';
import { Container, Col, Form, Button, Card, Row, Toast } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { SAVE_BOOK } from '../utils/mutations';
import type { User } from '../models/User';
import { GET_ME } from '../utils/queries';
import type { Book } from '../models/Book';
import type { GoogleAPIBook } from '../models/GoogleAPIBook';
import './Search.css'
import { useNavigate } from 'react-router-dom';



const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false); 
  const navigate = useNavigate();

  const [saveBook] = useMutation(SAVE_BOOK);

  const { data } = useQuery(GET_ME);
  const userData: User | undefined = data?.me;

  // Función para verificar si el libro ya está guardado
  const isBookSaved = (bookId: string) => {
    return userData?.savedBooks?.some((savedBook) => savedBook.bookId === bookId);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
    if (!response.ok) {
      console.error('Error fetching data from Google Books API:', response.statusText);
      return;
    }

    const { items } = await response.json();

    const bookData = items.map((book: GoogleAPIBook) => ({
      bookId: book.id,
      authors: book.volumeInfo.authors || ['Unknown author'],
      title: book.volumeInfo.title,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks?.thumbnail || '',
    }));

    setSearchedBooks(bookData);
    setSearchInput('');
  };

  const handleSaveBook = async (bookId: string) => {
    const bookToSave: Book = searchedBooks.find((book) => book.bookId === bookId)!;

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      await saveBook({ variables: { bookInput: bookToSave } });

      setAlertMessage('Book saved!');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="Search_bar">
        <h1>Hi {userData?.username}, what book are you looking for today?</h1>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                size="lg"
                placeholder="Type the name of the book"
                className="Search_input"
              />
            </Col>
            <Col xs={12} md={4}>
              <Button type="submit" className="Click_button" size="lg">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
  
      {/* Book Results */}
      <Container>
        {showAlert && (
          <Toast
            onClose={() => setShowAlert(false)}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1050,
            }}
            className="bg-success text-white"
          >
            <Toast.Body>{alertMessage}</Toast.Body>
          </Toast>
        )}
  
        <Row className="g-4">
          {searchedBooks.map((book) => (
            <Col lg="4" md="6" sm="12" key={book.bookId}>
              <Card className="book-card">
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                    className="card-img-top"
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Row>
                      <Col xs={6}>
                        <Button
                          className="Click_button w-100"
                          onClick={() => handleSaveBook(book.bookId)}
                          disabled={isBookSaved(book.bookId)}
                        >
                          {isBookSaved(book.bookId)
                            ? 'Book Already Saved'
                            : 'Save this Book!'}
                        </Button>
                      </Col>
                      <Col xs={6}>
                        <Button
                          className="btn-block btn-secondary w-100"
                          onClick={() =>
                            navigate(`/books/${book.bookId}/reviews`)
                          }
                        >
                          View Reviews
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}  

export default SearchBooks;