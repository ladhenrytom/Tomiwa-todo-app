import deleteIcon from "./../delete-icon-copy.svg";

function Task(props) {
  return (
    <div className="task" id={props.id}>
      <input
        type="checkbox"
        className="checkbox"
        checked={props.task.taskStatus}
        onChange={props.handleChecked}
        name="checked"
      />
      <div className={`task-name ${props.task.isChecked && "checked"}`}>
        {props.task.taskName}
      </div>
      <img
        className={"delete-icon-task"}
        // className={props.deleteBtn ? "delete-icon-task" : "hidden"}
        alt=""
        src={deleteIcon}
        onClick={props.deleteTask}
      />
    </div>
  );
}

export default Task;
