import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
function ExpenceItem(props) {
  return (
    <ListGroup.Item>
      {props.desc}
    </ListGroup.Item>
  )
}

export default ExpenceItem