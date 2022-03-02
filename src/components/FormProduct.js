import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import ListProductComponent from "./ListProductComponent";

function FormProduct() {
  const url = "http://127.0.0.1:8000/api/v1/product";
  /**
   * CREATE
   */
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    qty: "",
    image: "",
  });

  function submit(params) {
    params.preventDefault();
    axios
      .post(url, {
        name: data.name,
        description: data.description,
        price: parseInt(data.price),
        qty: parseInt(data.qty),
        image: "a",
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  function handle(params) {
    const newData = { ...data };
    newData[params.target.id] = params.target.value;
    setData(newData);
  }

  /**
   * LIST
   */
  //  function componentDidMount() {
  //   axios
  //     .get(API_URL + "product")
  //     .then((res) => {
  //       const produks = res.data;
  //       this.setState({ produks });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  return (
    <Row className="mt-4 px-4">
      <Col md={4} className="justify-content-center">
        <Form onSubmit={(e) => submit(e)}>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={(e) => handle(e)}
              id="name"
              value={data.name}
              type="text"
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={(e) => handle(e)}
              id="description"
              value={data.description}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={(e) => handle(e)}
              id="price"
              value={data.price}
              type="number"
              placeholder="price"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={(e) => handle(e)}
              id="qty"
              value={data.qty}
              type="number"
              placeholder="qty"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <ListProductComponent />
        {/* <Row>
          {produks &&
            produks.map((dataProduk) => (
              <ListProduct key={dataProduk.id} dataProduk={dataProduk} />
            ))}
        </Row> */}
      </Col>
    </Row>
  );
}

export default FormProduct;
