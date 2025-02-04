import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = ({ tasks, onReorder, onUpdate, onDelete }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const handleEditClick = (task) => {
    setEditingTask(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = (id) => {
    onUpdate(id, { title: editedTitle, description: editedDescription });
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    onReorder(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps} className="list-unstyled">
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="card mb-3 shadow-sm"
                    style={{ ...provided.draggableProps.style }}
                  >
                    <div className="card-body">
                      {editingTask === task.id ? (
                        <>
                          <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="form-control mb-2"
                          />
                          <input
                            type="text"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            className="form-control mb-2"
                          />
                          <div className="d-flex justify-content-between">
                            <button onClick={() => handleSaveEdit(task.id)} className="btn btn-success btn-sm">
                              Guardar
                            </button>
                            <button onClick={handleCancelEdit} className="btn btn-secondary btn-sm">
                              Cancelar
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h5 className="card-title">{task.title}</h5>
                          <p className="card-text">{task.description}</p>
                          <div className="d-flex justify-content-between">
                            <button
                              onClick={() => onUpdate(task.id, { ...task, completed: !task.completed })}
                              className="btn btn-outline-primary btn-sm"
                            >
                              {task.completed ? 'Marcar Incompleta' : 'Marcar Completa'}
                            </button>
                            <button onClick={() => handleEditClick(task)} className="btn btn-warning btn-sm">
                              Editar
                            </button>
                            <button onClick={() => onDelete(task.id)} className="btn btn-outline-danger btn-sm">
                              Eliminar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
