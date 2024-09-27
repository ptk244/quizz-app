import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css"; 

const API_BASE_URL = "http://localhost:5000/api/quiz"; 

const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 

    const startQuiz = async () => {
        setLoading(true); 
        try {
            
            const response = await fetch(`${API_BASE_URL}/quizzes`);
            const data = await response.json();
            if (data.length > 0) {
                const quizId = data[0]._id; 
                navigate(`/quiz/${quizId}`, { state: { quizData: data[0].questions } });
            } else {
                alert("No quizzes available.");
            }
        } catch (error) {
            console.error("Error starting the quiz:", error);
            alert("Failed to start quiz. Please try again later.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="container">
            <div className="home-container">
                <div className="logo-container">
                <img src="src/assets/upraised_logo.jpeg" alt="Upraised logo" className="logo" />
                <h1><b>upraised</b></h1>
                </div>
                <div className="quiz-container">
                    <div className="quiz-circle">
                        <p>Quiz</p>
                    </div>
                    <button className="start-button" onClick={startQuiz} disabled={loading}>
                        {loading ? "Loading..." : "Start"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
