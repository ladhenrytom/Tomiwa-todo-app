import deleteIcon from "./../delete-icon-copy.svg";

function Task(props) {
  return (
    <div className="task" id={props.id}>
      <input
        type="checkbox"
        className="checkbox"
        checked={props.status}
        onChange={props.handleChecked}
        name="checked"
      />
      <div className={`${props.className} ${props.status && "checked"}`}>
        {props.taskName}
      </div>
      <img
        className={props.deleteBtn ? "delete-icon-task" : "hidden"}
        alt=""
        src={deleteIcon}
        onClick={props.deleteTask}
      />
    </div>
  );
}

export default Task;
