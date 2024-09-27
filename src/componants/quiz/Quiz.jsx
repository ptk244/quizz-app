import { useState, useEffect } from "react";
import "./Quiz.css";
// import { data } from "../../assets/data";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api/quiz";

const Quiz = () => {
  const { quizId } = useParams();
  console.log(quizId);

  const navigate = useNavigate();
  const location = useLocation();
  const quizData = location.state.quizData;
  //   const quizData=data[0].questions;
  console.log("quizDatauuuuu", quizData);

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(null);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  useEffect(() => {
    console.log(quizData.length);

    if (quizData.length > 0) {
      setQuestion(quizData[0]);
    }
  }, [quizData]);

  // console.log(quizData);

  const correctCount = score;
  const wrongCount = index - score;
  const progress = ((index + 1) / quizData.length) * 100;

  const next = async () => {
    if (lock) {
      if (index === quizData.length - 1) {
        try {
          const response = await fetch(`${API_BASE_URL}/quizzes/finish`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quizId,
              score,
            }),
          });
          const resultquizData = await response.json();
          console.log(resultquizData);
        } catch (error) {
          console.error("Error finishing quiz:", error);
        }
        setResult(true);
        setIndex(index + 1);
        return;
      }
      document.querySelectorAll("li").forEach((li) => {
        li.classList.remove("correct", "wrong");
      });
      setIndex(index + 1);
      setQuestion(quizData[index + 1]);
      setLock(false);
    }
  };

  const checkAns = (e, ans) => {
    // console.log("Questionnn....",question);
    // console.log("ans....",ans);

    if (!lock) {
      if (question.correctAnswers[0] === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
        console.log("score", score);
      } else {
        e.target.classList.add("wrong");
        document.querySelectorAll("li").forEach((li, idx) => {
          if (idx === question.correctAnswers[0]) {
            li.classList.add("correct");
          }
        });
      }
      setLock(true);
    }
  };

  const reset = () => {
    setResult(false);
    setIndex(0);
    setQuestion(quizData[0]);
    setScore(0);
    setLock(false);
    navigate("/");
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="image-container" />
      <div className="content">
        {result ? (
          <>
            <div className="result-box">
              <h1>Your Result</h1>
              <div
                className="speedometer"
                style={{
                  "--percentage": `${(score / quizData.length) * 100}%`,
                }}
              >
                <div className="circle">
                  <p>{((score / quizData.length) * 100).toFixed(0)}%</p>
                </div>
              </div>
              <div className="answer-count">
                <p className="count">Correct Answers: {correctCount}</p>
                <p className="count">Wrong Answers: {wrongCount}</p>
              </div>
            </div>
            <button className="next-btn" onClick={reset}>
              Start Again
            </button>
          </>
        ) : (
          <>
            <div
              className="circular-progress"
              style={{ "--progress": `${progress}%` }}
            >
              <div className="circle">
                <h1>{index + 1}</h1> <p>/{quizData.length}</p>
                
              </div>
            </div>
            <h2>
              {index + 1}. {question.question}
            </h2>
            {/* {question.image && (
              <div className="question-image">
                <img src={question.image} alt={`Question ${index + 1} image`} />
              </div>
            )} */}
            <ul>
              {question.options.map((option, idx) => (
                <li key={idx} onClick={(e) => checkAns(e, idx)}>
                  {option}
                </li>
              ))}
            </ul>
            <button onClick={next} className="next-btn">
              Next
            </button>
            <div className="index">
              Question {index + 1} of {quizData.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
