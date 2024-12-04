import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_BOOK, ADD_REVIEW } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import './Mybooks.css';

// Modal Component
const AddReviewModal = ({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (review: { text: string; rating: number }) => void;
}) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<number>(1);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ text: review, rating });
    setReview('');
    setRating(1);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a Review</h2>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
        ></textarea>
        <div className="rating-input">
          <label htmlFor="rating">Rating (1-5): </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [deleteBook] = useMutation(DELETE_BOOK);
  const [addReview] = useMutation(ADD_REVIEW);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<string | null>(null);
  const navigate = useNavigate();

  const userData = data?.me;

  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) return false;

    try {
      await deleteBook({ variables: { bookId } });
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (bookId: string) => {
    setCurrentBook(bookId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentBook(null);
  };

  const saveReview = async (review: { text: string; rating: number }) => {
    if (!currentBook) {
      console.error("No book selected for the review.");
      return;
    }

    try {
      const { data } = await addReview({
        variables: {
          bookId: currentBook,
          reviewInput: {
            review: review.text,
            rating: review.rating,
          },
        },
      });

      console.log("Review saved successfully:", data);
    } catch (error) {
      console.error("Error saving review:", error);
    } finally {
      closeModal();
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <div>
      <div className="sidebar">
        <h2>MY LIBRARY</h2>
        <div className="decorative-line"></div>
      </div>

      <main className="main-content">
        {userData?.savedBooks.length ? (
          userData.savedBooks.map((book) => (
            <div className="book-card" key={book.bookId}>
              <img src={book.image || '/default-book.png'} alt={`Cover for ${book.title}`} />
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <button className="add-review" onClick={() => openModal(book.bookId)}>
                  Add Review
                </button>
                <button onClick={() => handleDeleteBook(book.bookId)}>Delete Book</button>
              </div>
            </div>
          ))
        ) : (
          <h2>You have no saved books!</h2>
        )}
      </main>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveReview}
      />
    </div>
  );
};

export default SavedBooks;
