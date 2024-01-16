import React , { useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import DestinationFinder from '../apis/DestinationFinder';
import { useParams } from 'react-router-dom';
import { DestinationContext } from '../context/DestinationContext';

const useStyles = makeStyles({
  reviewFormContainer: {
    backgroundColor: '#f8fbff',
    display: 'flex',
    margin: 'auto',
    width: '100%',
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: '15px',
  },
  formContainer: {
    border: '5px solid #f1f1f1',
    '& h1': {
      textAlign: 'center',
      fontSize: '30px',
      fontWeight: 'bold',
      margin: '10px 0',
    }
  },
  formMainContainer: {
    textAlign: 'center',
    margin: '16px 50px 12px',
    '& div': {
      padding: '16px 0',
      textAlign: 'left',
    },
  },
  inputField: {
    width: '100%',
    padding: '16px 8px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#2067db',
    color: 'white',
    padding: '14px 0',
    display: 'block',
    border: 'none',
    cursor: 'grab',
    width: '48%',
    margin: '10px auto 30px auto',
    '&:hover': {
      backgroundColor: '#3f51b5',
    },
  },
});

const AddReviewForm = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { setSelectedDestination } = useContext(DestinationContext);
  const [ name, setName ] = useState("");
  const [ reviewText, setReviewText ] = useState("");
  const [ rating, setRating ] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await DestinationFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      })
       // Update the selectedDestination with the new review data
       setSelectedDestination((prevDestination) => {
        if (!prevDestination) return null;

        const updatedReviews = [...prevDestination.reviews, response.data.data.review];

        return {
          ...prevDestination,
          reviews: updatedReviews,
        };
      });
      // Clear the form fields
      setName('');
      setReviewText('');
      setRating('');
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.reviewFormContainer}>
    <form className={classes.formContainer}>
      <h1>Add Your Review here!</h1>
      <div className={classes.formMainContainer}>
        <div>
          <label htmlFor="name"><strong>Your Name</strong></label>
          <input 
          value={name} 
          onChange = {(e) => setName(e.target.value)}
          type="text"
          id='name' 
          placeholder="Enter your name" 
          name="name" required 
          className={classes.inputField}
          />
          <label htmlFor="rating"><strong>Rating</strong></label>
          <select 
           value={rating} 
           onChange = {(e) => setRating(e.target.value)}
           id='rating' 
           className={classes.inputField}
          >
            <option disabled>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label htmlFor="review"><strong>Review</strong></label>
          <textarea
          value={reviewText} 
          onChange = {(e) => setReviewText(e.target.value)}
          type="text"
          id='review' 
          placeholder="Enter your review" 
          name="review" required 
          className={classes.inputField}
          />
        </div>
      </div>
      <button 
      onClick={handleSubmitReview} 
      type="submit" className={classes.button}><strong>Submit</strong></button>
    </form>
    </div>
  )
}

export default AddReviewForm;
