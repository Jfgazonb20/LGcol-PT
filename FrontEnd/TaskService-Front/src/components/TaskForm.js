import React, { useState } from 'react';

function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description };
    onCreate(newTask); // Llamamos la función para crear la tarea
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Agregar Tarea</button>
    </form>
  );
}

export default TaskForm;
