import Input from "./Input";
import Task from "./Task";

function All(props) {
  return (
    <div className="all-container">
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
        className={props.taskArr.length < 1 ? "no-completed-tasks" : "hidden"}
      >
        No tasks
      </div>
      <div className="tasks-container">
        {props.taskArr.map((el, index) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
}

export default All;
