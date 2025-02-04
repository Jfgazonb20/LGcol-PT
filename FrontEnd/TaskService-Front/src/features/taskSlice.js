import { createSlice } from '@reduxjs/toolkit';
import taskService from '../services/taskService';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    }
  },
});

export const { setTasks, setLoading, setError, addTask, updateTask, removeTask } = taskSlice.actions;

export const fetchTasks = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const tasks = await taskService.getTasks();
    dispatch(setTasks(tasks));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    const newTask = await taskService.createTask(task);
    dispatch(addTask(newTask));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const editTask = (id, updatedTask) => async (dispatch) => {
  try {
    const updatedTaskData = await taskService.updateTask(id, updatedTask);
    dispatch(updateTask(updatedTaskData));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await taskService.deleteTask(id);
    dispatch(removeTask(id));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default taskSlice.reducer;
