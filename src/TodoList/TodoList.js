// TodoList.js
import React, { useState } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import TodoForm from '../TodoForm/TodoForm';
import './TodoList.css';

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem('todoList');
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

const TodoList = () => {
  const [todoList, setTodoList] = useState(getTodoListFromLocalStorage());

  const addTodo = (todo) => {
    setTodoList([...todoList, todo]);
  };

  const deleteTodo = (todoId) => {
    setTodoList(todoList.filter((todo) => todo.id !== todoId));
  };

  const toggleTodoStatus = (todoId) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === todoId ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  const updateTodoText = (todoId, newText) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === todoId ? { ...todo, text: newText } : todo
      )
    );
  };

  const saveTodoListToLocalStorage = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };
  
  

  return (
    <div className="todos-bg-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="todos-heading">Todos</h1>
            <TodoForm onAddTodo={addTodo} />
            <h1 className="todo-items-heading">
              My <span className="todo-items-heading-subpart">Tasks</span>
            </h1>
            <ul className="todo-items-container">
              {todoList.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onToggleStatus={toggleTodoStatus}
                  onUpdateText={updateTodoText}
                />
              ))}
            </ul>
            <button className='button' onClick={saveTodoListToLocalStorage}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
