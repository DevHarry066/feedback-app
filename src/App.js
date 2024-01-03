import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import FeedbackData from './Data/FeedbackData';
import FeedbackStats from './components/FeedbackStats';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import AboutIconLink from './components/AboutIconLink';
import AboutPage from './Pages/AboutPage';

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      setFeedback(feedback.filter(item => item.id !== id));
    }
  }
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  }

  return (
    <Router>
      <Header text="React UI" />
      <div className='container'>
        <Routes>
          <Route exact path='/' element={
            <>
              <FeedbackForm handleAdd={addFeedback} />
              <FeedbackStats feedback={feedback} />
              <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
            </>
          }>
          </Route>
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </div>
      <AboutIconLink />
    </Router>
  )
}

export default App;
