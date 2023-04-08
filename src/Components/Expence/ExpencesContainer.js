import React, { useState, useEffect } from "react";
import ExpenceItem from "./ExpenceItem";
import ListGroup from "react-bootstrap/ListGroup";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../../Store/Auth";

function ExpencesContainer(props) {
  const Items = useSelector((state) => state.expense.expences);
  useEffect(() => {
    console.log({ ItemsExpenseContainer: Items });
    props.fetchExpences();
  }, []);

  function downloadCSVFile(Items, filename) {
    var val = `ID,Price,Desc,category \n`;
    let csv = val + Object.entries(Items).map(([key, item]) => {
       let cal =`${key},${item.Price},${item.desc},${item.category}\n`;
      return cal;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    link.remove();
  }

  return (
    <Container className="py-4 vh-75">
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

        {!props.isLoading && Object.values(Items).length == 0 && (
          <>No expense available</>
        )}

        <button onClick={() => downloadCSVFile(Items,"cvsfile")} className="btn btn-sm btn-secondary">download</button>
      </ListGroup>
    </Container>
  );
}

export default ExpencesContainer;
