
function FeedbackStats({feedback}) {
    let average = feedback.reduce((acc, curr) => {
        return acc + curr.rating
    }, 0) / feedback.length;

    //To Fixed to one place with replace 0
    average = average.toFixed(1).replace(/[.,]0$/, '');
  return (
    <div className="feedback-stats">
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Ratings: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

export default FeedbackStats