import { useState } from "react";

export default function TaskItem({ task, updateTask, deleteTask, handleRead }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);

  const startEdit = () => {
    setEditing(true);
    setEditTitle(task.title);
    setEditDesc(task.description);
  };

  const saveEdit = () => {
    if (editTitle.trim() === "" || editDesc.trim() === "") return;

    updateTask(task.id, editTitle, editDesc);
    setEditing(false);
  };

  return (
    <li className="task-item">

      {editing ? (
        <>
          {/* Edit title */}
          <input
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Edit title..."
          />

          {/* Edit description */}
          <input
            className="edit-input"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Edit description..."
          />

          <button className="save-btn" onClick={saveEdit}>
            Save
          </button>
        </>
      ) : (
        <>
          {/* SHOW TITLE */}
          <span className="task-text">{task.title}</span>

          <div className="actions">
            <button className="read-btn" onClick={() => handleRead(task)}>
              Read
            </button>

            <button className="edit-btn" onClick={startEdit}>
              Edit
            </button>

            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </>
      )}

    </li>
  );
}
