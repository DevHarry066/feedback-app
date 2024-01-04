import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeebackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is feedback from the context 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This is feedback from the context 2',
            rating: 8
        },
        {
            id: 3,
            text: 'This is feedback from the context 3',
            rating: 7
        }
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    //Add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    }

    // Delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            setFeedback(feedback.filter(item => item.id !== id));
        }
    }

    //Edit Feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        });
    }

    //Update Feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(
            feedback.map(item => (item.id === id ? {
                ...item, ...updItem
            } : item))
        )
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>

}

export default FeedbackContext