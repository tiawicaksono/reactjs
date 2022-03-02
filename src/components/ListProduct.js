import { hasPointerEvents } from "@testing-library/user-event/dist/utils";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const ListProduct = (props) => {
  let description = "";
  const strDescription = props.dataProduk.description;
  if (strDescription.length > 10) {
    description = strDescription.slice(0, 10);
  } else {
    description = strDescription;
  }

  return (
    <Col md={4} xs={6} className="mb-4">
      <Card style={{ width: "18rem" }} className="shadow">
        <Card.Img variant="top" src="kalkun.jpeg" />
        <Card.Body>
          <Card.Title>{props.dataProduk.name.toUpperCase()}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>Rp.{numberWithCommas(props.dataProduk.price)}</Card.Text>
          <Button
            variant="primary"
            onClick={() => props.update(props.dataProduk)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="removeButton mx-2"
            onClick={() => props.remove(props.dataProduk.id)}
          >
            Remove
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ListProduct;
