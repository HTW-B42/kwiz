import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userName, setUserName] = useState('');
  const [gamePhase, setGamePhase] = useState('login');
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);


  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8080/quiz');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    setQuestions(
      questions.map((question, qIndex) =>
        qIndex === currentQuestion
          ? { ...question, userAnswer: index }
          : question
      )
    );
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      const score = questions.reduce((acc, question) => {
        return question.options[question.userAnswer] &&
          question.options[question.userAnswer].isCorrect
          ? acc + 1
          : acc;
      }, 0);
      setScoreboard([...scoreboard, { user: userName, score }]);
      setGamePhase('scoreboard');
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuestions(questions.map(q => ({ ...q, userAnswer: null })));
  };

  const handleLogin = (name) => {
    setUserName(name);
    resetQuiz();
    setGamePhase('quiz');
  };

  const handleNewQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setGamePhase('quiz');
  };

  const renderOptions = () => {
    return questions[currentQuestion].options.map((option, index) => {
      let backgroundColor = '';
      if (selectedAnswer === index) {
        backgroundColor = option.isCorrect ? 'green' : 'red';
      } else if (selectedAnswer !== null && option.isCorrect) {
        backgroundColor = 'green';
      }

      return (
        <button
          key={index}
          onClick={() => handleAnswerClick(index)}
          style={{ backgroundColor }}
          disabled={selectedAnswer !== null}
        >
          {option.text}
        </button>
      );
    });
  };

  return (
    <div className="App">
      {gamePhase === 'login' && <Login onLogin={handleLogin} />}
      {gamePhase === 'quiz' && questions.length > 0 && (
        <div>
          <h1>{questions[currentQuestion].question}</h1>
          <div className="options">{renderOptions()}</div>
          {selectedAnswer !== null && (
            <button
              onClick={handleNextQuestion}
              style={{ marginTop: '20px' }}
            >
              Next Question
            </button>
          )}
        </div>
      )}
      {gamePhase === 'scoreboard' && (
        <Scoreboard
          scores={scoreboard}
          onNewQuiz={handleNewQuiz}
          onChangeUsername={() => {
            resetQuiz();
            setGamePhase('login');
          }}
        />
      )}
      {questions.length === 0 && <h1>Loading...</h1>}
    </div>
  );
}

function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(name);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          required
        />
        <button type="submit">StartQuiz</button>
      </form>
    </div>
  );
}

function Scoreboard({ scores, onNewQuiz, onChangeUsername }) {
  return (
    <div className="scoreboard">
      <h1 className="scoreboard-title">Scoreboard</h1>
      <table className="scoreboard-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.user}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="scoreboard-buttons">
        <button onClick={onNewQuiz}>Start New Quiz</button>
        <button onClick={onChangeUsername}>Change Username</button>
      </div>
    </div>
  );
}


export default App;
