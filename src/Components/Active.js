import Input from "./Input";
import Task from "./Task";
// import { useState, useEffect } from "react";

function Active(props) {
  return (
    <div className="active-container">
      <Input
        addTask={props.addTask}
        task={props.task}
        taskName={props.task.taskName}
        taskId={props.task.taskId}
        taskStatus={props.task.taskStatus}
        setTask={props.setTask}
        handleChange={props.handleChange}
      />
      <div
        className={props.activeArr.length < 1 ? "no-completed-tasks" : "hidden"}
      >
        No active tasks
      </div>
      <div className="tasks-container">
        {props.taskArr.map((el, index) => {
          return (
            !el.taskStatus && (
              <Task
                status={el.taskStatus}
                key={index}
                id={el.taskId}
                className="task-content"
                taskName={el.taskName}
                handleChecked={props.handleChecked}
                deleteTask={props.deleteTask}
                deleteBtn={props.deleteBtn}
              />
            )
          );
        })}
      </div>
    </div>
  );
}

export default Active;
