import React, { useState, useEffect } from "react";
import ExpenceItem from "./ExpenceItem";
import ListGroup from "react-bootstrap/ListGroup";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { expenseAction } from "../../Store/Expenses";

function ExpencesContainer(props) {
  const Items = useSelector((state) => state.expense.expences);
  useEffect(() => {
    console.log({ ItemsExpenseContainer: Items });
    props.fetchExpences();
  }, []);

  return (
    <Container className="my-4">
      <ListGroup>
        {props.isLoading && <>Fetching data......</>}
        {!props.isLoading &&
          !!Items &&
          Object.keys(Items).map((element) => {
            return (
              <ExpenceItem
                key={element}
                id={element}
                price={Items[element].Price}
                desc={Items[element].desc}
                category={Items[element].category}
                deleteExpence={props.deleteExpence}
                invokeEditModal={props.invokeEditModal}
              />
            );
          })}
          {Object.values(Items).length == 0 && <>No expense available</>}
      </ListGroup>
    </Container>
  );
}

export default ExpencesContainer;
