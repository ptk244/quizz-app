import { useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data"; 
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  const correctCount = score;
  const wrongCount = index - score; // total questions answered minus correct ones
  const progress = ((index + 1) / data.length) * 100; 

  const next = () => {
    
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      document.querySelectorAll("li").forEach((li) => {
        li.classList.remove("correct", "wrong");
      });
      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setLock(false);
    }
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.correctAnswer === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        document.querySelectorAll("li").forEach((li, idx) => {
          if (idx === question.correctAnswer) {
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
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    navigate("/")
  };

  return (
    <div className="container">
      <div className="image-container" />
      <div className="content">
        {result ? (
          <>
            <div className="result-box">
              <h1>
                Your Result
              </h1>
              <div className="speedometer" style={{ "--percentage": `${(score / data.length) * 100}%` }}>
                <div className="circle">
                  <p>{((score / data.length) * 100).toFixed(0)}%</p>
                </div>
              </div>
              <div className="answer-count">
                <p className="count">Correct Answers: {correctCount}</p>
                <p className="count">Wrong Answers: {wrongCount}</p>
              </div>
            </div>
            <button className="next-btn" onClick={reset}>Start Again</button>
          </>
        ) : (
          <>
            <div className="circular-progress" style={{ "--progress": `${progress}%` }}>
              <div className="circle">
                <p>{index + 1}/{data.length}</p>
              </div>
            </div>
            <h2>
              {index + 1}. {question.question}
            </h2>
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
              Question {index + 1} of {data.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
