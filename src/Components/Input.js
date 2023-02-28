function Input(props) {
  return (
    <form className="input-container" onSubmit={props.addTask}>
      <input
        className="input"
        type="text"
        placeholder="Add details"
        value={props.taskName}
        onChange={props.handleChange}
        name="taskName"
      />
      <input className="add-btn" type="submit" value="ADD" />
    </form>
  );
}

export default Input;
