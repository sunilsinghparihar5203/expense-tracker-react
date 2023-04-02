import React, { useState, useEffect } from "react";
import ExpenceItem from "./ExpenceItem";
import ListGroup from "react-bootstrap/ListGroup";
import { Container } from "react-bootstrap";

function ExpencesContainer(props) {
  useEffect(() => {
    props.fetchExpences()
  }, [])
  
  return (
    <Container className="my-4">
      <ListGroup>
        {props.isLoading && <>Fetching data......</>}
        {!props.isLoading &&
          Object.keys(props.Items).map((element) => {
            return (
              <ExpenceItem
                key={element}
                id={element}
                price={props.Items[element].Price}
                desc={props.Items[element].category}
                category={props.Items[element].desc}
              />
            );
          })}
      </ListGroup>
    </Container>
  );
}

export default ExpencesContainer;
