import "./App.css";
import Input from "./Components/Input";
import Task from "./Components/Task";
import { useState, useEffect } from "react";

function App() {
  //inintialize task. Task is an object
  const [task, setTask] = useState({
    taskName: "",
    taskId: +localStorage.getItem("taskId") || 0,
    taskStatus: false,
    isChecked: false,
  });
  //initialize task array to hold tasks
  const [taskArr, setTaskArr] = useState(
    Array.from(JSON.parse(localStorage.getItem("tasks")) || [])
  );

  //a state variable to indicate which tab is currently being viewed, the all tab is set as default
  const [state, setState] = useState("all");

  //setting the taskid in local storage back to zero when task array is empty
  useEffect(() => {
    taskArr.length === 0 && localStorage.setItem("taskId", 0);
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

  //addtask function that runs when the add button is clicked
  function addTask(e) {
    e.preventDefault();
    const newArr = [];
    if (!task.taskName.replace(/\s/g, "").length < 1) {
      if (
        taskArr.filter((el) => {
          return (
            el.taskName.toLocaleLowerCase() ===
            task.taskName.toLocaleLowerCase()
          );
        }).length === 0
      ) {
        task.taskId = task.taskId + 1;
        newArr.push(task);
        setTaskArr((prevArr) => {
          return [...newArr, ...prevArr];
        });
        localStorage.setItem("tasks", JSON.stringify([...newArr, ...taskArr]));
        localStorage.setItem("taskId", task.taskId);
      } else
        alert(
          "Task already added. Uncheck to add again if task already completed"
        );
    }
    setTask((prev) => {
      return {
        ...prev,
        taskName: "",
        taskStatus: false,
        isChecked: false,
      };
    });
  }

  //handlechecked function to control the checkboxes
  function handleChecked(e) {
    taskArr.forEach((el) => {
      if (+e.target.parentElement.id === el.taskId) {
        const targetTask = taskArr.find((task) => {
          return task.taskId === el.taskId;
        });
        targetTask.taskStatus = !targetTask.taskStatus;
        targetTask.isChecked = !targetTask.isChecked;
      }
    });
    localStorage.setItem("tasks", JSON.stringify([...taskArr]));
    setTaskArr(Array.from(JSON.parse(localStorage.getItem("tasks"))));
  }

  //deletetask function that runs when the delete icon/button is clicked
  function deleteTask(e) {
    let newArr = [];
    if (e.target.classList.contains("delete-icon-task")) {
      // console.log(e.target.parentElement.id);
      newArr = [
        ...taskArr.filter((el) => {
          return el.taskId !== +e.target.parentElement.id;
        }),
      ];
      setTaskArr([...newArr]);
      localStorage.setItem("tasks", JSON.stringify([...newArr]));
    } else if (e.target.classList.contains("delete-all-btn")) {
      newArr = taskArr.filter((el) => {
        return el.isChecked === false;
      });
      setTaskArr([...newArr]);
      localStorage.setItem("tasks", JSON.stringify([...newArr]));
    }
  }

  //function to switch tab between completed, active, and all section
  function activeTab(e) {
    if (e.target.classList.contains("main-header-item")) {
      document.querySelectorAll(".main-header-item").forEach((el) => {
        el.classList.remove("main-header-active");
      });
      e.target.classList.add("main-header-active");
      if (e.target.classList.contains("completed")) {
        setState("completed");
        document.querySelector(".input-container").classList.add("hidden");
        document.querySelector(".delete-all-btn").classList.remove("hidden");

        runDisplayTasks();
      }
      if (e.target.classList.contains("active")) {
        setState("active");
        document.querySelector(".input-container").classList.remove("hidden");
        document.querySelector(".delete-all-btn").classList.add("hidden");
        runDisplayTasks();
      }
      if (e.target.classList.contains("all")) {
        setState("all");
        document.querySelector(".input-container").classList.remove("hidden");
        document.querySelector(".delete-all-btn").classList.add("hidden");
        setTaskArr(Array.from(JSON.parse(localStorage.getItem("tasks"))));
        runDisplayTasks();
      }
    }
  }

  //display tasks in task array
  function displayTasks(arr) {
    return arr.map((el, index) => {
      return (
        <Task
          key={index}
          task={el}
          id={el.taskId}
          handleChecked={handleChecked}
          deleteTask={deleteTask}
        />
      );
    });
  }

  //run the display tasks function conditionally to fit each tab
  function runDisplayTasks() {
    if (state === "all") {
      return displayTasks(taskArr);
    }
    if (state === "active") {
      return displayTasks(
        taskArr.filter((el) => {
          return el.isChecked === false;
        })
      );
    }
    if (state === "completed") {
      return displayTasks(
        taskArr.filter((el) => {
          return el.isChecked === true;
        })
      );
    }
  }

  ///no task indicator when task array is empty
  function noTasksIndicator() {
    if (state === "all") {
      return taskArr.length === 0 && "No tasks to display";
    }
    if (state === "active") {
      return (
        taskArr.filter((el) => {
          return el.isChecked === false;
        }).length === 0 && "No active tasks to display"
      );
    }
    if (state === "completed") {
      return (
        taskArr.filter((el) => {
          return el.isChecked === true;
        }).length === 0 && "No completed tasks to display"
      );
    }
  }

  return (
    <div className="app">
      <div className="app-title">#Todo</div>
      <div className="main-container">
        <div className="main-headers-container" onClick={activeTab}>
          <div className="main-header-item main-header-active all">All</div>
          <div className="main-header-item active">Active</div>
          <div className="main-header-item completed">Completed</div>
        </div>
        <div className="main-content-container">
          <Input task={task} addTask={addTask} handleChange={handleChange} />
          <h1 className="no-task-indicator">{noTasksIndicator()}</h1>
          <div className="tasks-container">{runDisplayTasks()}</div>
          <button className="delete-all-btn hidden" onClick={deleteTask}>
            Delete all
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
