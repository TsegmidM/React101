import { Button, Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./style.css";
import { ImCheckmark } from "react-icons/im";

export default function KahootClone() {
  const [quizes, setQuizes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(0);
  const [isAnswered, setIsAnswered] = useState("");
  const [key, setKey] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [points, setPoints] = useState({ totalPoint: 0, roundPoint: 0 });

  const svgs = [
    "M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z",
    "M4,16.0038341 L16,4 L28,16.0007668 L16,28 L4,16.0038341 Z",
    "M16,27 C9.92486775,27 5,22.0751322 5,16 C5,9.92486775 9.92486775,5 16,5 C22.0751322,5 27,9.92486775 27,16 C27,22.0751322 22.0751322,27 16,27 Z",
    "M7,7 L25,7 L25,25 L7,25 L7,7 Z",
  ];
  useEffect(() => {
    if (isAnswered === "green") setScore((Date.now() - startTime) / 1000, true);
    else setScore(0, false);
  }, [isAnswered]);
  useEffect(() => {
    fetchQuizes();
  }, []);
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too late...</div>;
    }

    return (
      <div className="timer">
        <div className="timer-text">Remaining</div>
        <div className="timer-value">{remainingTime}</div>
        <div className="timer-text">seconds</div>
      </div>
    );
  };
  const setScore = (responseTime, correct) => {
    if (correct === true) {
      const roundPoint = parseInt((1 - responseTime / 30 / 2) * 1000);
      setPoints((currState) => {
        return {
          ...currState,
          roundPoint: roundPoint,
          totalPoint: currState.totalPoint + roundPoint,
        };
      });
    } else
      setPoints((currState) => {
        return {
          ...currState,
          roundPoint: 0,
        };
      });
      // console.log(points)
  };
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
      {/* scoreboard section */}
      {activeQuiz === 10 ? (
        <div className="kahoot-scoreboard-container">
          <div className="kahoot-scoreboard">Scoreboard</div>
          <div className="kahoot-scoreboard-main">
            <span>
              You got{" "}
              <span style={{ color: "#FFC527" }}>{points.totalPoint}</span>{" "}
              points!
            </span>
            <span style={{ fontSize: "25px" }}>Want to play again?</span>
            <button
              className="kahoot-start-btn"
              onClick={() => {
                setActiveQuiz(0);
                fetchQuizes();
                setIsAnswered("");
                setStartTime(Date.now());
              }}
            >
              Start
            </button>
            <img src="https://assets-cdn.kahoot.it/challenge/assets/podium-transparent.281c26f0.png" />
          </div>
        </div>
      ) : (
        <div>
          <div className="kahoot-quiz">
            <div className="kahoot-current-quiz">{`${
              activeQuiz + 1
            } of 10`}</div>
            <span className="kahoot-quiz-text">
              {quizes[activeQuiz]?.question}
            </span>
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
            {!isAnswered && !isTimeUp && (
              <div className="timer-wrapper">
                <CountdownCircleTimer
                  size={200}
                  key={key}
                  isPlaying
                  duration={30}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[10, 6, 3, 0]}
                  onComplete={() => {
                    setIsTimeUp(true);
                  }}
                >
                  {renderTime}
                  {/* {renderTime} */}
                  {/* {({ remainingTime }) => remainingTime} */}
                </CountdownCircleTimer>
              </div>
            )}
            {
              <div
                className="kahoot-point-status"
                style={{
                  background: isAnswered
                    ? points.roundPoint !== 0
                      ? "rgb(102, 191, 57,0.5)"
                      : "rgb(255, 51, 85,0.5)"
                    : "",
                }}
              >
                {!isTimeUp
                  ? isAnswered &&
                    (points.roundPoint !== 0
                      ? `You got ${points.roundPoint} points this round!`
                      : "No one said it would be easy ;)")
                  : "Hurry up next time"}

                {/* {isAnswered || isTimeUp && <span>No Worries, Good Luck next round</span>} */}
              </div>
            }
            {(isAnswered || isTimeUp) && (
              <button
                className="kahoot-next-btn"
                // disabled={isAnswered ? false : true}
                onClick={() => {
                  // if (activeQuiz < quizes.length - 1) {
                  setActiveQuiz((currState) => currState + 1);
                  setKey((currState) => currState + 1);
                  setIsAnswered(null);
                  setIsTimeUp(false);
                  setStartTime(Date.now());
                  // } else {
                  //   setActiveQuiz(0);
                  //   fetchQuizes();
                  //   setIsAnswered("");
                  //   setStartTime(Date.now());
                  // }
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
                  <Col span={12} key={idx}>
                    <div className="kahoot-answers">
                      <button
                        className={`kahoot-answer-btn kahoot-btn${idx}`}
                        disabled={!isAnswered && !isTimeUp ? false : true}
                        style={{
                          background:
                            isAnswered || isTimeUp
                              ? answer.isCorrect
                                ? "rgb(102, 191, 57)"
                                : "rgb(255, 51, 85)"
                              : "",
                        }}
                        onClick={() => {
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
                          {(isAnswered || isTimeUp) &&
                            (answer.isCorrect ? (
                              <ImCheckmark />
                            ) : (
                              <svg
                                width="21"
                                height="21"
                                viewBox="0 0 50 50"
                                overflow="visible"
                                stroke="white"
                                strokeWidth={20}
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
