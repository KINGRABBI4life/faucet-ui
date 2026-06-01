import './TodoItem.css'

function TodoItem({ todo, onToggle, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <div className="todo-content">
        <span className="todo-text">{todo.text}</span>
        <span className="todo-date">{formatDate(todo.createdAt)}</span>
      </div>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        title="Delete todo"
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
