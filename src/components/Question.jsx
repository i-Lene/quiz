import Timer from "./Timer";
import Answers from "./Answers";
import { useState } from "react";
import DUMMY_QUESTIONS from "../questions";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null
  });

  let TIMER = 15000;

  if (answer.selectedAnswer) {
    TIMER = 1000;
  }

  if (answer.isCorrect !== null) {
    TIMER = 2000;
  }

  function handleSelectedAnswer(selectedAnswer) {
    setAnswer({
      selectedAnswer,
      isCorrect: null
    });

    setTimeout(() => {
      const isCorrect = DUMMY_QUESTIONS[index].answers[0] === selectedAnswer;
      setAnswer({
        selectedAnswer,
        isCorrect
      });

      setTimeout(() => {
        onSelectAnswer(selectedAnswer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "selected";
  }

  return (
    <div id="question">
      <Timer
        key={TIMER}
        timeout={TIMER}
        onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{DUMMY_QUESTIONS[index].text}</h2>
      <Answers
        userAnswers={DUMMY_QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        currentAnswerState={answerState}
        answerState={answerState}
        handleSelectedHanswer={handleSelectedAnswer}
      />
    </div>
  );
}
