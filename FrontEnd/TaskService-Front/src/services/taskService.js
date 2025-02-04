import axios from 'axios';

const API_URL = 'http://localhost:8081/tasks'; // Asegúrate de que esta URL coincida con tu backend

// Obtener todas las tareas
const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Crear una nueva tarea
const createTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Actualizar una tarea existente
const updateTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Eliminar una tarea
const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
