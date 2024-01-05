import { createContext, useState, useEffect } from "react";
const FeedbackContext = createContext();

export const FeebackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        const response = await fetch('/feedback?_sort=id&_order=desc');
        const feedbackData = await response.json();
        setFeedback(feedbackData);
        setIsLoading(false);
    }

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    //Add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        });
        const feedbackData = await response.json();
        setFeedback([feedbackData, ...feedback]);
    }

    // Delete feedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            //Delete feedback from database
            await fetch(`/feedback/${id}`, { method: 'DELETE' });

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
    const updateFeedback = async (id, updItem) => {
        //Update Feedback in database
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        });

        const updatedData = await response.json();

        setFeedback(
            feedback.map(item => (item.id === id ? {
                ...item, ...updatedData
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