import React from 'react';
import Quiz from './components/quiz';
import './App.css';

const App = () => {
  return (
    <div className="main">
      <h1>Квіз — українські слова англійською</h1>
      <Quiz />
    </div>
  );
};

export default App;