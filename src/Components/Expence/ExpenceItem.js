import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

function ExpenceItem(props) {
  const deleteHandler = () => {
    props.deleteExpence(props.id);
  };

  const editHandler = () => {
    console.log("inside edit");
    props.invokeEditModal(props.id, props.desc, props.price, props.category);
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <span>{props.desc}</span>
      <span>{props.category} </span>
      <span> $ {parseInt(props.price).toFixed(2)} </span>
      <div>
        <button className="badge text-bg-info border-0" onClick={editHandler}>
          edit
        </button>{" "}
        <button
          className="badge text-bg-danger border-0"
          onClick={deleteHandler}
        >
          Delete
        </button>
      </div>
    </ListGroup.Item>
  );
}

export default ExpenceItem;
