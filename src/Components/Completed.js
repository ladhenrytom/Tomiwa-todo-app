import deleteIcon from "./../delete-icon.svg";
import Task from "./Task";

function Completed(props) {
  return (
    <div className="completed-container">
      <div
        className={
          props.completeArr.length < 1 ? "no-completed-tasks" : "hidden"
        }
      >
        No completed tasks
      </div>

      <div className={"completed-tasks"}>
        <div className="tasks-container">
          {props.taskArr.map((el, index) => {
            return (
              el.taskStatus && (
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
      <button className={"deleteAll-btn"} onClick={props.deleteTask}>
        <img alt="" src={deleteIcon} className="delete-icon-completed" />
        delete all
      </button>
    </div>
  );
}

export default Completed;
