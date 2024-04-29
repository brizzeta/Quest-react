import React, { useState } from 'react';

const Question = ({ question, options, correctAnswer, onNext, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleOptionSelect = (option) => {
    if (!answered) {
      setSelectedOption(option);
    }
  };

  const checkAnswer = () => {
    setAnswered(true);
    const isCorrect = selectedOption === correctAnswer;
    onAnswer(isCorrect);
  };

  const handleNext = () => {
    onNext();
    setSelectedOption(null);
    setAnswered(false);
  };

  return (
    <div>
      <h2>{question}</h2>
      <form>
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionSelect(option)}
              disabled={answered}
            />
            {option}
          </label>
        ))}
      </form>
      {answered && <p className={selectedOption === correctAnswer ? 'correct' : 'incorrect'}>{selectedOption === correctAnswer ? 'Вірно!' : 'Невірно!'}</p>}
      <button onClick={answered ? handleNext : checkAnswer}>
        {answered ? 'Наступне' : 'Підтвердити'}
      </button>
    </div>
  );
};

export default Question;