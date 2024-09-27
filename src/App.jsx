
import Quiz from './componants/quiz/Quiz'
import Home from './componants/quiz/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App