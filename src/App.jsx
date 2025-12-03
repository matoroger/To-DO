import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  // ==========================
  //  STATE
  // ==========================

  // Tasks (null = not loaded yet)
  const [tasks, setTasks] = useState(null);

  // New task inputs
  const [newTask, setNewTask] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Edit state
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  // Read modal
  const [selectedTask, setSelectedTask] = useState(null);

  // ==========================
  //  LOCAL STORAGE
  // ==========================

  // Load saved tasks on mount
  useEffect(() => {
    const saved = localStorage.getItem("my_tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks([]); // First time user
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (tasks !== null) {
      localStorage.setItem("my_tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Prevent UI render before data loads
  if (tasks === null) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Loading tasks...
      </p>
    );
  }

  // ==========================
  //  ADD TASK
  // ==========================
  const addTask = () => {
    if (newTask.trim() === "" || newDesc.trim() === "") return;

    const newItem = {
      id: Date.now(),
      title: newTask,
      description: newDesc,
    };

    setTasks([...tasks, newItem]);
    setNewTask("");
    setNewDesc("");
  };

  // ==========================
  //  DELETE TASK
  // ==========================
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // ==========================
  //  READ MODAL
  // ==========================
  const openReadModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  // ==========================
  //  EDIT TASK
  // ==========================
  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditText(task.title);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title: editText } : t
      )
    );

    setEditingTask(null);
    setEditText("");
  };

  // ==========================
  //  UI
  // ==========================
  return (
    <div className="todo-card">
      <h1 className="todo-title">Todo App</h1>

      {/* Inputs */}
      <div className="input-row">
        <input
          className="todo-input"
          placeholder="Task Title..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>

      <div className="input-row">
        <input
          className="todo-input"
          placeholder="Task Description..."
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>+</button>
      </div>

      {/* Task List */}
      {tasks.map((task) => (
        <div className="task-item" key={task.id}>
          {editingTask === task.id ? (
            <>
              <input
                className="edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button className="save-btn" onClick={() => saveEdit(task.id)}>
                Save
              </button>
            </>
          ) : (
            <>
              <span className="task-text">{task.title}</span>

              <div className="actions">
                <button className="read-btn" onClick={() => openReadModal(task)}>
                  Read
                </button>

                <button className="edit-btn" onClick={() => startEdit(task)}>
                  Edit
                </button>

                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Footer */}
      <div className="footer-row">
        <p>You have {tasks.length} pending tasks</p>
        <button className="clear-btn" onClick={() => setTasks([])}>
          Clear All
        </button>
      </div>

      {/* Read Modal */}
      {selectedTask && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedTask.title}</h2>
            <p>{selectedTask.description}</p>

            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
