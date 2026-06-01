import { useState } from 'react'
import './TodoForm.css'

function TodoForm({ onAddTodo }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!input.trim()) {
      setError('Please enter a todo')
      return
    }

    if (input.length > 100) {
      setError('Todo text is too long (max 100 characters)')
      return
    }

    onAddTodo(input.trim())
    setInput('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            if (error) setError('')
          }}
          className={error ? 'input-error' : ''}
          maxLength="100"
        />
        <button type="submit" className="add-btn">+</button>
      </div>
      {error && <span className="error-message">{error}</span>}
      {input && <span className="char-count">{input.length}/100</span>}
    </form>
  )
}

export default TodoForm
