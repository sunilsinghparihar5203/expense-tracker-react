import React from "react";
import AddExpence from "./AddExpence";
import ExpenceItem from "./ExpenceItem";
import ListGroup from 'react-bootstrap/ListGroup';
import { Container } from "react-bootstrap";



function ExpencesContainer(props) {
  return (
    <Container>
      <ListGroup>
        {props.items.map(element => {
          return <ExpenceItem key={element.id} id={element.id} price={element.money} desc={element.desc} category={element.category}/>
        })}
      </ListGroup>
    </Container>
  );
}

export default ExpencesContainer;
