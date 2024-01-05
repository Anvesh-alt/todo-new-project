import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import './TodoItem.css';

const TodoItem = ({ todo, onDelete, onToggleStatus, onUpdateText }) => {
  const { id, text, isChecked } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onUpdateText(id, editedText);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <li className="todo-item-container">
      <input
        type="checkbox"
        className="checkbox-input"
        checked={isChecked}
        onChange={() => onToggleStatus(id)}
      />
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            className="edit-input"
            value={editedText}
            onChange={handleInputChange}
          />
          <div className="edit-icons-container">
            
            <FaSave onClick={handleSaveClick}/>
          </div>
        </div>
      ) : (
        <div className={`todo-item-container1 ${isChecked ? 'checked' : ''}`}>
          <label className="checkbox-label" htmlFor={`checkbox${id}`}>
            {text}
          </label>
          <div className="edit-icons-container">
            
            <FaEdit onClick={handleEditClick}/>
            <MdDelete onClick={() => onDelete(id)}/>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;