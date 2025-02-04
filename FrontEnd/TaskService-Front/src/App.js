import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';
import { useTheme } from './ThemeContext';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const { theme, toggleTheme } = useTheme();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/tasks');
      if (!response.ok) {
        throw new Error('Error al obtener las tareas');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await fetch('http://localhost:8081/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`http://localhost:8081/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
      }
      const updatedTaskData = await response.json();
      setTasks(tasks.map(task => (task.id === id ? updatedTaskData : task)));
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/tasks/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReorder = (newOrder) => {
    setTasks(newOrder);
  };

  useEffect(() => { fetchTasks(); }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className={`App ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container py-5">
        <h1 className="text-center mb-4">Lista de Tareas</h1>
        {error && <p className="text-danger">{error}</p>}
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <button onClick={toggleTheme} className="btn btn-secondary mb-3">
              Cambiar a {theme === 'dark' ? 'Claro' : 'Oscuro'}
            </button>

            <div className="filter-buttons">
              <button className="filter-btn all-btn" onClick={() => setFilter('all')}>Todas</button>
              <button className="filter-btn completed-btn" onClick={() => setFilter('completed')}>Completadas</button>
              <button className="filter-btn pending-btn" onClick={() => setFilter('pending')}>Pendientes</button>
            </div>

            <TaskForm onCreate={createTask} />
            <TaskList tasks={filteredTasks} onReorder={handleReorder} onUpdate={updateTask} onDelete={deleteTask} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;