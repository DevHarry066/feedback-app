import FeedbackItem from "./FeedbackItem";

function FeedbackList({feedback, handleDelete}) {
    if(!feedback || feedback.length === 0) {
        return <p>No feedback data yet</p>
    }
    return (
    <>
    <div className="feedback-list">
        {feedback.map((item) => (
            <FeedbackItem key={item.id} feedbackData={item} handleDelete ={handleDelete}/>
        ))}
    </div>
    </>
  )
}

export default FeedbackList