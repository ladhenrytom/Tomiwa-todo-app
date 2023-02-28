import "./App.css";
import All from "./Components/All";
import Active from "./Components/Active";
import Completed from "./Components/Completed";
import { useState } from "react";

function App() {
  const deleteBtn = false;

  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  const [task, setTask] = useState({
    taskName: "",
    taskId: 0,
    taskStatus: false,
  });
  const [taskArr, setTaskArr] = useState(tasks);

  const [status, setStatus] = useState(false);
  let activeArr = taskArr.filter((el) => {
    return !el.taskStatus;
  });
  let completeArr = taskArr.filter((el) => {
    return el.taskStatus;
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setTask((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleChecked(e) {
    taskArr.forEach((el) => {
      if (+e.target.parentElement.id === el.taskId) {
        el.taskStatus = !el.taskStatus;
      }
    });
    localStorage.setItem("tasks", JSON.stringify([...taskArr]));
    setStatus((prev) => !prev);
  }

  function addTask(e) {
    e.preventDefault();
    const newArr = [];
    if (!task.taskName.replace(/\s/g, "").length < 1) {
      task.taskId++;
      newArr.push(task);
      setTaskArr((prevArr) => {
        return [...newArr, ...prevArr];
      });
      localStorage.setItem("tasks", JSON.stringify([...newArr, ...taskArr]));
    }
    setTask((prev) => {
      return {
        ...prev,
        taskName: "",
        taskStatus: false,
      };
    });
  }

  function deleteTask(e) {
    let newArr = [];
    if (e.target.classList.contains("delete-icon-task")) {
      newArr = taskArr.filter((el) => {
        return el.taskId !== +e.target.parentElement.id;
      });
    } else {
      newArr = taskArr.filter((el) => {
        return !el.taskStatus;
      });
    }
    setTaskArr(newArr);
    localStorage.setItem("tasks", JSON.stringify([...newArr]));
  }

  function activeTab(e) {
    if (e.target.classList.contains("main-header")) {
      document.querySelectorAll(".main-header").forEach((el) => {
        el.classList.remove("main-header-active");
      });
      document.querySelectorAll(".display").forEach((el) => {
        el.classList.add("hidden");
        if (el.classList.contains(e.target.id)) {
          el.classList.remove("hidden");
        }
      });
      if (e.target.classList.contains("main-header")) {
        e.target.classList.add("main-header-active");
      }
    }
    // setTempArray();
  }

  return (
    <div className="app">
      <div className="title">#Todo</div>
      <div className="main">
        <div className="main-headers" onClick={activeTab}>
          <div className="main-header main-header-active" id="all">
            All
          </div>
          <div className="main-header" id="active">
            Active
          </div>
          <div className="main-header" id="completed">
            Completed
          </div>
        </div>
        <div className="main-content">
          <div className="display all">
            <All
              task={task}
              setTask={setTask}
              addTask={addTask}
              taskArr={taskArr}
              handleChange={handleChange}
              handleChecked={handleChecked}
              deleteTask={deleteTask}
              deleteBtn={deleteBtn}
            />
          </div>
          <div className="display active hidden">
            <Active
              task={task}
              setTask={setTask}
              addTask={addTask}
              taskArr={taskArr}
              handleChange={handleChange}
              handleChecked={handleChecked}
              deleteTask={deleteTask}
              activeArr={activeArr}
              deleteBtn={deleteBtn}
            />
          </div>
          <div className="display completed hidden">
            <Completed
              task={task}
              setTask={setTask}
              addTask={addTask}
              taskArr={taskArr}
              handleChange={handleChange}
              handleChecked={handleChecked}
              deleteTask={deleteTask}
              status={status}
              setStatus={setStatus}
              completeArr={completeArr}
              deleteBtn={!deleteBtn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
