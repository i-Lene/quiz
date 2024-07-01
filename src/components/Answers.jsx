import { useRef } from "react";
import DUMMY_QUESTIONS from "../questions";

export default function Answers({
  userAnswers,
  handleSelectedHanswer,
  selectedAnswer,
  currentAnswerState
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...userAnswers];
    shuffledAnswers.current.sort((a, b) => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSlelect = selectedAnswer === answer;
        let cssClasses = "";

        if (currentAnswerState === "selected" && isSlelect) {
          cssClasses = "selected";
        }

        if (
          currentAnswerState === "correct" ||
          (currentAnswerState === "wrong" && isSlelect)
        ) {
          cssClasses = currentAnswerState;
        }

        return (
          <li className="answer" key={shuffledAnswers.current.indexOf(answer)}>
            <button
              className={cssClasses}
              onClick={() => handleSelectedHanswer(answer)}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
