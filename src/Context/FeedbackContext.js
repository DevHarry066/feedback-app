import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeebackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        const response = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc');
        const feedbackData = await response.json();
        setFeedback(feedbackData);
        setIsLoading(false);
    }

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
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>

}

export default FeedbackContext