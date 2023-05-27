import { useEffect, useState } from "react";
import "./App.css";
import Task from "./components/Task.tsx";

export const url = "http://127.0.0.1:8000";

function App() {
  type Tasks = {
    readonly id: number;
    title: string;
    completed: Boolean;
  };

  const [tasks, setTasks] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchData = async () => {
    // console.log("Fetching...");
    const response = await fetch(`${url}/api/task-list/`);
    const data = await response.json();
    setTasks(data);
  };

  const [newTask, setNewTask] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [buttonValue, setButtonValue] = useState("Add");

  useEffect(() => {
    fetchData();
    setFetching(false);
  }, [fetching]);

  const addNote = async () => {
    fetch(`${url}/api/task-create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    setFetching(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNote();
    setInputValue("");
  };

  const [editId, setEditId] = useState(0);

  const editItem = async (id: number) => {
    let newItem = { title: inputValue };
    fetch(`${url}/api/task-update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    setButtonValue("Add");
    setInputValue("");
    setFetching(true);
  };

  return (
    <div className="container mt-5">
      {/* 
      // <div className="container">
      //   <div className="task-container"> */}
      <div className="card">
        <div className="card-body">
          <h2 className="my-heading">Todo App</h2>
          <div className="form-wrapper">
            <input
              id="todo"
              type="text"
              name="todo"
              className="form-control"
              placeholder="Add Todo..."
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue(e.target.value);
                const data = { title: e.target.value };
                setNewTask(data);
              }}
            />
            {buttonValue === "Add" ? (
              <input
                type="submit"
                className="btn btn-success"
                value={buttonValue}
                onClick={handleSubmit}
              />
            ) : (
              <input
                type="submit"
                className="btn btn-success"
                value={buttonValue}
                onClick={() => editItem(editId)}
              />
            )}
          </div>
          <hr />
          <div className="list-wrapper mt-3">
            {tasks.map((task: Tasks, index) => (
              <Task
                key={index}
                item={task}
                setEditId={setEditId}
                setFetching={setFetching}
                setInputValue={setInputValue}
                setButtonValue={setButtonValue}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
