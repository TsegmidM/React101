import { Button, Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./style.css";
import { ImCheckmark } from "react-icons/im";
import { IoMdClose } from "react-icons/io";

export default function KahootClone() {
  const [quizes, setQuizes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(1);
  const [isAnswered, setIsAnswered] = useState("");
  const [key, setKey] = useState(0);
  const svgs = [
    "M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z",
    "M4,16.0038341 L16,4 L28,16.0007668 L16,28 L4,16.0038341 Z",
    "M16,27 C9.92486775,27 5,22.0751322 5,16 C5,9.92486775 9.92486775,5 16,5 C22.0751322,5 27,9.92486775 27,16 C27,22.0751322 22.0751322,27 16,27 Z",
    "M7,7 L25,7 L25,25 L7,25 L7,7 Z",
  ];
  useEffect(() => {
    fetchQuizes();
  }, []);

  const fetchQuizes = () => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple`
      )
      .then((res) => {
        if (res.status === 200) {
          setQuizes(
            res.data.results.map((quiz, idx) => {
              return {
                id: idx + 1,
                question: quiz.question,
                answers: [
                  { answer: quiz.correct_answer, isCorrect: true },
                  ...quiz.incorrect_answers.map((incAnswer) => {
                    return {
                      answer: incAnswer,
                      isCorrect: false,
                    };
                  }),
                ].sort(() => (Math.random() > 0.5 ? 1 : -1)),
              };
            })
          );
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          console.error("Either your endpoint is wrong or no data found!");
        }
      })
      .finally((finallyP) => {
        console.log("request is completed!", finallyP);
      });
  };

  return (
    <div
      className="kahoot-main"
      style={{
        backgroundImage: `url(https://images-cdn.kahoot.it/acf73135-050e-4126-b172-d0dbb436012e?auto=webp?auto=webp&width=1800)`,
      }}
    >
      {activeQuiz === 10 ? (
        <div> GAME OVER</div>
      ) : (
        <div>
          <div className="kahoot-quiz">
            <div className="kahoot-current-quiz">{`${activeQuiz} of 10`}</div>
            <span className="kahoot-quiz-text">{quizes[activeQuiz]?.question}</span>
          </div>
          <div className="kahoot-middle-secion">
            {isAnswered && (
              <div
                className="timeUp"
                style={{
                  background: isAnswered
                    ? isAnswered === "green"
                      ? "rgb(102, 191, 57)"
                      : "rgb(255, 51, 85)"
                    : "",
                }}
              >
                <span className="timeup-text">
                  {isAnswered &&
                    (isAnswered === "green"
                      ? "Your answer is CORRECT"
                      : "Your answer is incorrect")}
                </span>
              </div>
            )}
            {!isAnswered && (
              <div>
                <CountdownCircleTimer
                  size={100}
                  key={key}
                  isPlaying
                  duration={3}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[10, 6, 3, 0]}
                  onComplete={() => ({ shouldRepeat: false, delay: 1 })}
                >
                  {/* {renderTime} */}
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
              </div>
            )}
            {isAnswered && (
              <button
                className="kahoot-next-btn"
                disabled={isAnswered ? false : true}
                onClick={() => {
                  setActiveQuiz((currState) => currState + 1);
                  setIsAnswered(null);
                  setKey((currState) => currState + 1);
                }}
              >
                NEXT
              </button>
            )}
          </div>
          <div className="kahoot-answer-section">
            {/* <Row></Row> */}
            <Row gutter={[0, 10]}>
              {quizes[activeQuiz]?.answers.map((answer, idx) => {
                return (
                  <Col span={12}>
                    <div className="kahoot-answers">
                      <button
                        className={`kahoot-answer-btn kahoot-btn${idx}`}
                        key={idx}
                        disabled={!isAnswered ? false : true}
                        style={{
                          background: isAnswered
                            ? answer.isCorrect
                              ? "rgb(102, 191, 57)"
                              : "rgb(255, 51, 85)"
                            : "",
                        }}
                        onClick={() => {
                          // console.log(answer);
                          setIsAnswered(answer.isCorrect ? "green" : "red");
                        }}
                      >
                      
                        <span className="kahoot-answers-btn-text">
                          <svg width={50} viewBox="0 0 32 32">
                            <path d={svgs[idx]} style={{ fill: "white" }} />
                          </svg>
                          {answer.answer}
                          </span>
                        <span>
                          {isAnswered &&
                            (answer.isCorrect ? (
                              <ImCheckmark />
                            ) : (
                              <svg
                                width="21"
                                height="21"
                                viewBox="0 0 50 50"
                                overflow="visible"
                                stroke="white"
                                stroke-width="20"
                              >
                                <line x2="50" y2="50" />
                                <line x1="50" y2="50" />
                              </svg>
                            ))}
                        </span>
                       
                      </button>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}
