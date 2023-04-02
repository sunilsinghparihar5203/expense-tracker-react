import React, { useRef, useState } from "react";
import { Container, Row, Form, Button, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";



function AddExpence(props) {
  const moneyRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const addExpenceFormHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const money = moneyRef.current.value;
    const desc = descRef.current.value;
    const category = categoryRef.current.value;
    const id = Date.now();
    console.log({
      id:id,
      money: money,
      desc: desc,
      category: category,
    });
    
    props.onaddItem({id:id,money: money,desc: desc,category: category,})
    setIsLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-4">
        <Col sm={8} className="shadow-sm p-3 mb-5 bg-body rounded py-4">
          <Form onSubmit={addExpenceFormHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Money spent</Form.Label>
              <Form.Control
                type="number"
                placeholder="Money spent"
                min="0"
                ref={moneyRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                ref={descRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={categoryRef}
              >
                <option> Select category</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
                <option value="Travel">Travel</option>
                <option value="Medicine">Medicine</option>
                <option value="EMI">EMI</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              {isLoading && (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Saving...
                </>
              )}
              {!isLoading && "Save"}
            </Button>
            <Link to={"/"}>
              <button type="button" className="btn btn-danger mx-4">
                Cancle
              </button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddExpence;
