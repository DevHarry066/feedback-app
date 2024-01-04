import {motion, AnimatePresence} from 'framer-motion';
import { useContext } from 'react';
import FeedbackContext from '../Context/FeedbackContext';
import FeedbackItem from "./FeedbackItem";

function FeedbackList() {
    const {feedback } = useContext(FeedbackContext);
    if(!feedback || feedback.length === 0) {
        return <p>No feedback data yet</p>
    }
    return (
    <>
    <div className="feedback-list">
        <AnimatePresence>
        {feedback.map((item) => (
            <motion.div
                key={item.id}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                >
            <FeedbackItem key={item.id} feedbackData={item} />
            </motion.div>
        ))}
        </AnimatePresence>
    </div>
    </>
  )
}

export default FeedbackList