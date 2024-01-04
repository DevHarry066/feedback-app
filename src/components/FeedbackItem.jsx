import Card from "./shared/Card";
import { FaTimes, FaEdit } from 'react-icons/fa';
import { useContext } from "react";
import FeedbackContext from "../Context/FeedbackContext";
function FeedbackItem({feedbackData}) {
  const {deleteFeedback, editFeedback } = useContext(FeedbackContext);

    return (
    <>
      <Card>
        <div className="num-display">{ feedbackData.rating }</div>
        <button onClick={() => deleteFeedback(feedbackData.id)} className='close'>
            <FaTimes color="purple" />
        </button>
        <button onClick={() => editFeedback(feedbackData)} className='edit'>
            <FaEdit color="purple" />
        </button>
          <div className="text-display">
            {feedbackData.text}
          </div>
        </Card>
    </>
  );
}

export default FeedbackItem;
