import Card from "./shared/Card";
import { FaTimes } from 'react-icons/fa';

function FeedbackItem({feedbackData, handleDelete}) {

    return (
    <>
      <Card>
        <div className="num-display">{ feedbackData.rating }</div>
        <button onClick={() => handleDelete(feedbackData.id)} className='close'>
            <FaTimes color="purple" />
        </button>
          <div className="text-display">
            {feedbackData.text}
          </div>
        </Card>
    </>
  );
}

export default FeedbackItem;
