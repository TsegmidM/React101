import { Button, Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./style.css";
import { useCountdown } from "react-countdown-circle-timer";

export default function KahootClone() {
  const [quizes, setQuizes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(1);
  const [isAnswered, setIsAnswered] = useState("");
  const [key, setKey] = useState(0);

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
          <div>{`${activeQuiz}/10`}</div>

          <div className="kahoot-quiz">
            <span>{quizes[activeQuiz]?.question}</span>
          </div>
          <div>
            {isAnswered &&
              (isAnswered === "green"
                ? "Your answer is CORRECT"
                : "Your answer is incorrect")}
          </div>

          <div
            className="kahoot-middle-secion"
            style={{
              background: isAnswered
                ? isAnswered === "green"
                  ? "green"
                  : "red"
                : "",
            }}
          >
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
          </div>
          <div className="kahoot-answer-section">
            {/* <Row></Row> */}
            <Row gutter={[20, 15]}>
              {quizes[activeQuiz]?.answers.map((answer, idx) => {
                return (
                  <Col span={12}>
                    <div className="kahoot-answers">
                      <Button
                        className="kahoot-answer-div"
                        key={idx}
                        disabled={!isAnswered ? false : true}
                        style={{
                          background: isAnswered
                            ? answer.isCorrect
                              ? "green"
                              : "red"
                            : "",
                        }}
                        onClick={() => {
                          // console.log(answer);
                          setIsAnswered(answer.isCorrect ? "green" : "red");
                        }}
                      >
                        {answer.answer}
                      </Button>
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
