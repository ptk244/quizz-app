import { useNavigate } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
    const navigate=useNavigate();

    const startQuiz = () => {
        navigate("/quiz"); 
      };
  return (
    <div className="container">
    <div className="home-container">
      <div className="logo-container">
        <img src="/path-to-your-logo.png" alt="Upraised logo" className="logo" />
      </div>
      <div className="quiz-container">
        <div className="quiz-circle">
          <p>Quiz</p>
        </div>
        <button className="start-button" onClick={startQuiz}>Start</button>
      </div>
    </div>
    </div>
  );
};

export default Home;

