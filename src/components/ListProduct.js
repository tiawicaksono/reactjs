import { hasPointerEvents } from "@testing-library/user-event/dist/utils";
import React, { memo } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { API_URL } from "../utils/api";
import axios from "axios";
import { numberWithCommas } from "../utils/utils";

const ListProduct = (props) => {
  let description = "";
  const strDescription = props.dataProduk.description;
  if (strDescription.length > 10) {
    description = strDescription.slice(0, 10);
  } else {
    description = strDescription;
  }

  /**
   * DELETE PRODUCT
   */
  const deletePost = async (e) => {
    try {
      const response = await axios.delete(API_URL + e);
      props.showData();
    } catch (err) {
      console.log("error" + err);
    }
  };

  /**
   * UPDATE PRODUCT
   */
  const handleUpdate = async (e) => {
    try {
      props.setData(e);
      props.setUpdate(true);
    } catch (err) {
      console.log("error" + err);
    }
  };

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
            onClick={() => handleUpdate(props.dataProduk)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="removeButton mx-2"
            onClick={() => deletePost(props.dataProduk.id)}
          >
            Remove
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default memo(ListProduct);
