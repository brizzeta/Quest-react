import React, { useState } from 'react';
import Question from './question';
import questionsData from '../data/questions.json'; // Импорт данных из файла

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
    } else {
      setIncorrectAnswers(prevIncorrectAnswers => prevIncorrectAnswers + 1);
    }
  };

  const renderQuestion = () => {
    const { question, options, correctAnswer } = questionsData[currentQuestionIndex];
    return (
      <Question
        question={question}
        options={options}
        correctAnswer={correctAnswer}
        onAnswer={handleAnswer}
        onNext={handleNextQuestion}
      />
    );
  };

  const renderStats = () => {
    const totalQuestions = questionsData.length;
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>Total Questions: {totalQuestions}</p>
        <p>Correct Answers: {correctAnswers}</p>
        <p>Incorrect Answers: {incorrectAnswers}</p>
      </div>
    );
  };

  return (
    <div>
      {currentQuestionIndex < questionsData.length
        ? renderQuestion()
        : renderStats()}
    </div>
  );
};

export default Quiz;