import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';
import { useTheme } from './ThemeContext';
import taskService from './services/taskService'; // Importamos el servicio con Axios

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const { theme, toggleTheme } = useTheme();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks(); // Usamos Axios desde taskService.js
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task) => {
    try {
      const newTask = await taskService.createTask(task); // Usamos Axios
      setTasks([...tasks, newTask]);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const updatedTaskData = await taskService.updateTask(id, updatedTask); // Usamos Axios
      setTasks(tasks.map(task => (task.id === id ? updatedTaskData : task)));
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id); // Usamos Axios
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReorder = (newOrder) => {
    setTasks(newOrder);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
