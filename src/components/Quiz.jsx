import { useCallback, useState } from "react";
import DUMMY_QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Timer from "./Timer";
import Answers from "./Answers";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentAnswerState, setCurrentAnswerState] = useState("");

  const activeQuestionIndex =
    currentAnswerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === DUMMY_QUESTIONS.length;

  const AWAIT_TIME = 2000;
  const VALIDATE_TIME = 1000;

  const handleSelectedHanswer = useCallback(
    function handleUserAnswer(answer) {
      setCurrentAnswerState("selected");
      setUserAnswers((prevAnswer) => {
        return [...prevAnswer, answer];
      });

      setTimeout(() => {
        if (answer === DUMMY_QUESTIONS[activeQuestionIndex].answers[0]) {
          setCurrentAnswerState("correct");
        } else {
          setCurrentAnswerState("wrong");
        }
      }, VALIDATE_TIME);

      setTimeout(() => {
        setCurrentAnswerState("");
      }, AWAIT_TIME);
    },
    [activeQuestionIndex]
  );

  const handleSkipHanswer = useCallback(
    () => handleSelectedHanswer(null),
    [handleSelectedHanswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="img" />
        <h2>Quiz Completed !</h2>
      </div>
    );
  }

  const TIMER = 15000;

  return (
    <div id="quiz">
      <div id="question">
        <Timer
          key={activeQuestionIndex}
          timeout={TIMER}
          onTimeOut={handleSkipHanswer}
        />
        <h2>{DUMMY_QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          key={activeQuestionIndex + 1}
          handleSelectedHanswer={handleSelectedHanswer}
          currentAnswerState={currentAnswerState}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          userAnswers={DUMMY_QUESTIONS[activeQuestionIndex].answers}
        />
      </div>
    </div>
  );
}
