import { useState, useEffect } from 'react';
import Card from "./shared/Card";
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import { useContext } from 'react';
import FeedbackContext from '../Context/FeedbackContext';

function FeedbackForm() {
    const {addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [message, setMessage] = useState('');
   
    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setText(feedbackEdit.item.text);
            setBtnDisabled(false);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit]);


    const handleTextChange = (e) => {
        if(text === '') {
            setBtnDisabled(true);
            setMessage('');
        } else if(text !== '' && text.trim().length < 10) {
            setMessage('Review should be atleast 10 character');
            setBtnDisabled(true);
        } else {
            setBtnDisabled(false);
            setMessage(null);
        }
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback);
            }
            setText('');
        }
        
    }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={setRating} selected={rating} />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm