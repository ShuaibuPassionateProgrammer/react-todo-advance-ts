import React, { useState, useEffect } from 'react';
import './styles.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    
    // Check for dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const generateID = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newTodo: Todo = {
        id: generateID(),
        text: input.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([newTodo, ...todos]);
      setInput('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <div className="container">
        <header className="header">
          <h1 className="title">TODO</h1>
          <button 
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </header>

        <form onSubmit={handleSubmit} className="todo-form">
          <div className="input-container">
            <div className="check-circle"></div>
            <input
              type="text"
              placeholder="Create a new todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="todo-input"
            />
          </div>
        </form>

        <div className="todo-list-container">
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <button
                  className={`check-button ${todo.completed ? 'checked' : ''}`}
                  onClick={() => toggleTodo(todo.id)}
                  aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
                >
                  {todo.completed && '✓'}
                </button>
                <span className="todo-text">{todo.text}</span>
                <button
                  className="delete-button"
                  onClick={() => removeTodo(todo.id)}
                  aria-label={`Delete ${todo.text}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          {todos.length > 0 && (
            <div className="todo-footer">
              <span className="items-left">
                {activeTodos} {activeTodos === 1 ? 'item' : 'items'} left
              </span>
              
              <div className="filters">
                <button
                  className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button
                  className={`filter-button ${filter === 'active' ? 'active' : ''}`}
                  onClick={() => setFilter('active')}
                >
                  Active
                </button>
                <button
                  className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>

              <button
                className="clear-completed"
                onClick={clearCompleted}
                disabled={todos.every(todo => !todo.completed)}
              >
                Clear Completed
              </button>
            </div>
          )}
        </div>

        {todos.length === 0 && (
          <div className="empty-state">
            <p>No todos yet. Create your first one above!</p>
          </div>
        )}

        <footer className="instructions">
          <p>Drag and drop to reorder list</p>
        </footer>
      </div>
    </div>
  );
};

export default ToDo;