import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { API_URL } from "../utils/api";
import axios from "axios";
import ListProduct from "./ListProduct";

function FormProduct() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    qty: "",
    image: "",
  });
  const [posts, setPosts] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  /**
   * CREATE
   */

  function submit(params) {
    if (isUpdate) {
      params.preventDefault();
      axios
        .put(API_URL + data.id, {
          name: data.name.toUpperCase(),
          description: data.description,
          price: parseInt(data.price),
          qty: parseInt(data.qty),
          image: "a",
        })
        .then((res) => {
          showData();
          setData([]);
          setUpdate(false);
        });
    } else {
      params.preventDefault();
      axios
        .post(API_URL, {
          name: data.name.toUpperCase(),
          description: data.description,
          price: parseInt(data.price),
          qty: parseInt(data.qty),
          image: "a",
        })
        .then((res) => {
          showData();
          setData([]);
        });
    }
  }
  function handle(params) {
    const newData = { ...data };
    newData[params.target.id] = params.target.value;
    setData(newData);
  }

  /**
   * SHOW ALL PRODUCT
   */
  const showData = async () => {
    const response = await axios(API_URL);
    setPosts(response.data);
  };
  useEffect(() => {
    showData();
  }, []);

  /**
   * DELETE PRODUCT
   */
  const deletePost = async (e) => {
    try {
      const response = await axios.delete(API_URL + e);
      showData();
    } catch (err) {
      console.log("error" + err);
    }
  };

  /**
   * UPDATE PRODUCT
   */
  const handleUpdate = async (e) => {
    try {
      setData(e);
      setUpdate(true);
    } catch (err) {
      console.log("error" + err);
    }
  };

  return (
    <Row className="mt-4 px-4">
      <Col md={4}>
        <Form onSubmit={(e) => submit(e)} className="create-form">
          <Form.Group className="mb-3">
            {/* <Form.Label htmlFor="name">Name</Form.Label> */}
            <Form.Control
              onChange={(e) => handle(e)}
              id="name"
              value={data.name}
              type="text"
              placeholder="product name"
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
        <Row>
          {posts &&
            posts.map((produks) => (
              <ListProduct
                key={produks.id}
                dataProduk={produks}
                remove={deletePost}
                update={handleUpdate}
              />
            ))}
        </Row>
      </Col>
    </Row>
  );
}

export default FormProduct;
