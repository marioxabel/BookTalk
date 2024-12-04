// import { useState, useEffect } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import type { Review } from '../models/Book';
// import type { Book } from '../models/Book';
import { GET_BOOK } from '../utils/queries';





const ReviewPage = () => {
    const { bookId } = useParams<{ bookId: string }>();

    const { loading, error, data } = useQuery(GET_BOOK, {
        variables: { bookId },
    });

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { book } = data;

    // const [book, setBook] = useState<Book | null>(null);
    // const [reviews, setReviews] = useState<Review[]>([]);

    // useEffect(() => {
    //     // Fetch the book details based on bookId
    //     const fetchBook = async () => {
    //         try {
    //             const response = await fetch(`/api/books/${bookId}`);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch book details');
    //             }
    //             const data: Book = await response.json();
    //             setBook(data);
    //         } catch (error) {
    //             console.error('Error fetching book details:', error);
    //         }
    //     };

    //     // Fetch the reviews for the book
    //     const fetchReviews = async () => {
    //         try {
    //             const response = await fetch(`/api/books/${bookId}/reviews`);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch reviews');
    //             }
    //             const data: Review[] = await response.json();
    //             setReviews(data);
    //         } catch (error) {
    //             console.error('Error fetching reviews:', error);
    //         }
    //     };

    //     fetchBook();
    //     fetchReviews();
    // }, [bookId]);

    return (
        <>
            <div className="text-light bg-dark p-5 text-center">
                <Container>
                    <h1>Reviews of {book ? `"${book.title}"` : 'Loading...'}</h1>
                    <p>{book ? `By ${book.authors}` : ''}</p>
                </Container>
            </div>

            <Container className="mt-5">
                <Row className="justify-content-center">
                    {book.reviews.length > 0 ? (
                        book.reviews.map((review: Review, index: number) => (
                            <Col md={4} key={index} className="mb-4">
                                <Card border="dark" className="h-100">
                                    <Card.Body>
                                        <Card.Title>{review.userId.username}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-warning">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <span key={i}>{i < Math.floor(review.rating || 0) ? '★' : '☆'}</span>
                                            ))}
                                        </Card.Subtitle>
                                        <Card.Text>{review.review}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No reviews yet for this book.</p>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default ReviewPage;
