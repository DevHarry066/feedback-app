import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import AboutIconLink from './components/AboutIconLink';
import AboutPage from './Pages/AboutPage';
import { FeebackProvider } from './Context/FeedbackContext';

function App() {

  return (
    <FeebackProvider>
      <Router>
        <Header text="React UI" />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={
              <>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </>
            }>
            </Route>
            <Route path='/about' element={<AboutPage />} />
          </Routes>
        </div>
        <AboutIconLink />
      </Router>
    </FeebackProvider>
  )
}

export default App;
