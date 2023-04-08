import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Form, Button, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AddExpence(props) {
  const moneyRef = useRef();
  const descRef = useRef();
  const categoryRef = useRef();
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const username = useSelector((state) => state.auth.email).split("@")[0];

  useEffect(() => {
    if (props.isUpdate) {
      moneyRef.current.value = props.UpdateValues.price;
      descRef.current.value = props.UpdateValues.desc;
      categoryRef.current.value = props.UpdateValues.category;
    }
  }, [props]);

  const addExpenceFormHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const Price = moneyRef.current.value;
    const desc = descRef.current.value;
    const category = categoryRef.current.value;
    const id = Date.now();
    console.log({
      id: id,
      Price: Price,
      desc: desc,
      category: category,
    });

    const expence = { Price: Price, desc: desc, category: category };
    let data;
    if (props.isUpdate) {
      alert(props.UpdateValues.id);
      data = await props.UpdateExpence({
        id: props.UpdateValues.id,
        ...expence,
      });
    } else {
      data = await addExpence(expence);
    }

    if (!data) {
      alert("There might be some error");
    } else {
      props.fetchExpences();
      console.log("Successfully added!");
    }
    setIsLoading(false);
  };

  async function addExpence(expence) {
    const response = await fetch(
      `https://expense-tracker-e9e2b-default-rtdb.asia-southeast1.firebasedatabase.app/expences/${username}.json`,
      {
        method: "POST",
        body: JSON.stringify(expence),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      props.fetchExpences();
      return data;
    } else {
      return response.ok;
    }
  }

  const UpdateCancleHandler = () => {
    props.setIsUpdate(false);
    moneyRef.current.value = "";
    descRef.current.value = "";
    categoryRef.current.value = "";
  };
  return (
    <Container>
      <Row className="justify-content-md-center my-4">
        <Col
          sm={8}
          className="shadow-sm p-3 mb-5 bg-body rounded py-4"
          ref={formRef}
        >
          <Form onSubmit={addExpenceFormHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Money spent</Form.Label>
              <Form.Control
                type="number"
                placeholder="Money spent"
                min="0"
                ref={moneyRef}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                ref={descRef}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={categoryRef}
                required
                id="categorySelect"
              >
                <option value=""> Select category</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
                <option value="Travel">Travel</option>
                <option value="Medicine">Medicine</option>
                <option value="EMI">EMI</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Button variant={props.isUpdate ? "info" : "primary"} type="submit">
              {isLoading && (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {props.isUpdate ? "Saving..." : "Updating.."}
                </>
              )}
              {!isLoading && !props.isUpdate && "Save"}
              {!isLoading && props.isUpdate && "Update"}
            </Button>
            {!props.isUpdate && (
              <Link to={"/"}>
                <button type="button" className="btn btn-danger mx-4">
                  Cancle
                </button>
              </Link>
            )}
            {props.isUpdate && (
              <button
                type="button"
                className="btn btn-warning mx-4"
                onClick={UpdateCancleHandler}
              >
                Cancle
              </button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddExpence;
