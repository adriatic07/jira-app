const WorkItem = (props) => {
  const { assignee, summary } = props;
  return (
    <div style={{ border: "1px solid black" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>
          <b>Description of Work Item</b> - {summary}
        </p>
      </div>
      <p>
        Assignee : <i>{assignee}</i>
      </p>
    </div>
  );
};

export default WorkItem;
