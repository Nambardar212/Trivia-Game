import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");


  function fetchQuestion() {
    fetch('https://opentdb.com/api.php?amount=1')
    .then(respose => respose.json())
    .then(data => setQuestion(data.results[0]));
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(answer === "") {
        setResult("Please enter answer!");
        return;
    }
    if(answer === question.correct_answer) {
      setResult('Correct!');
    } else {
      setResult(`Incorrect! The correct answer is: ${question.correct_answer}`);
    }
    setAnswer('');
    fetchQuestion();
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  if(!question) {
    return <div>Loading...</div>
  }

  return (
    <div>
        <h1>Trivia Game</h1>
            <div>
              <p>Category : {question.category}</p>
              <p>Difficulty level :  {question.difficulty}</p>
              <p>Type : {question.type}</p>
              <h3>Question</h3>
              <p>{question.question}</p>
              <li>{question.correct_answer}</li>
              {
                question.incorrect_answers.map((option) => {
                  return (
                    <li key={option}>{option}</li>
                  )
                })
              }
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)} 
                />
                <button type='submit'>Submit</button>
              </form>
              <p>{result}</p>
            </div> 
    </div>
  );
}

export default App;
