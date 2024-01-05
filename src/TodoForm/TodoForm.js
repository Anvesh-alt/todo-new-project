import React, { useState, useEffect, useRef } from 'react';
import './TodoForm.css';

const TodoForm = ({ onAddTodo }) => {
  const [userInput, setUserInput] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [randomQuoteIndex, setRandomQuoteIndex] = useState(null);
  const apiCalled = useRef(false);

  useEffect(() => {
    if (!apiCalled.current) {
      fetch('https://type.fit/api/quotes')
        .then((response) => response.json()) 
        .then((data) => {
          setQuotes(data);
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomQuoteIndex(randomIndex);
        })
        .catch((error) => console.error('Error fetching quotes:', error));

      apiCalled.current = true; 
    }
  }, []); 

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleAddTodo = () => {
    if (userInput.trim() !== '') {
      onAddTodo({
        id: Date.now(),
        text: userInput,
        isChecked: false,
      });
      setUserInput('');
    } else {
      alert('Enter Valid Text');
    }
  };

  return (
    <div className='boxed'>
      <h1 className="create-task-heading">
        Create <span className="create-task-heading-subpart">Task</span>
      </h1>
      <input
        type="text"
        id="todoUserInput"
        className="todo-user-input"
        placeholder={randomQuoteIndex !== null ? quotes[randomQuoteIndex].text : 'What needs to be done?'}
        value={userInput}
        onChange={handleInputChange}
      />
      <button className="button" onClick={handleAddTodo}>
        Add
      </button>
    </div>
  );
};

export default TodoForm;
