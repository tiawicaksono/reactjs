import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { API_URL } from "../utils/api";
import axios from "axios";
import ListProduct from "./ListProduct";
import { FormSearch } from "./FormSearch";

const defaultValue = {
  name: "",
  description: "",
  price: "",
  qty: "",
  image: "",
};

const sortingValue = {
  sort: "",
  q: "",
  cat: "",
};
function FormProduct() {
  const [data, setData] = useState(defaultValue);
  const [posts, setPosts] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [queryParam, setQueryParam] = useState(sortingValue);

  /**
   * CREATE
   */
  function submit(params) {
    params.preventDefault();
    let formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // console.log(formData);
    if (isUpdate) {
      axios.put(API_URL + data.id, formData).then((res) => {
        showData();
        setData(defaultValue);
        setUpdate(false);
      });
    } else {
      axios.post(API_URL, formData).then((res) => {
        showData();
        setData(defaultValue);
      });
    }
  }
  function handle(params) {
    const newData = { ...data };
    newData[params.target.id] = params.target.value;
    setData(newData);
  }

  function uploadImage(params) {
    setData((a) => ({
      ...a,
      image: params.target.files[0],
    }));
  }
  /**
   * SHOW ALL PRODUCT
   */
  const showData = useCallback(async () => {
    const response = await axios(
      `${API_URL}?sort=${queryParam.sort}&cat=${queryParam.name}&q=${queryParam.q}`
    );
    setPosts(response.data);
  }, [queryParam]);

  useEffect(() => {
    // console.log(queryParam);
    showData();
  }, [queryParam]);

  /**
   * SEARCH
   */

  function handleChangeQueryParams(params) {
    setQueryParam(params);
  }

  return (
    <Row className="mt-4 px-4">
      <Col md={4}>
        <Form onSubmit={(e) => submit(e)} className="create-form">
          <Form.Group className="mb-3">
            {/* <Form.Label htmlFor="name">Name</Form.Label> */}
            <Form.Control
              onChange={(e) => handle(e)}
              id="name"
              value={data.name || ""}
              type="text"
              placeholder="product name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={(e) => handle(e)}
              id="description"
              value={data.description || ""}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={(e) => handle(e)}
              id="price"
              value={data.price || ""}
              type="number"
              placeholder="price"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              onChange={(e) => handle(e)}
              id="qty"
              value={data.qty || ""}
              type="number"
              placeholder="qty"
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={(e) => uploadImage(e)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <FormSearch
          setQueryParam={(a) => handleChangeQueryParams(a)}
          queryParam={queryParam}
        />
        <Row>
          {posts && posts.length < 1 && <p>tidak ada</p>}
          {posts &&
            posts.map((produks) => (
              <ListProduct
                key={produks.id}
                dataProduk={produks}
                showData={showData}
                setData={setData}
                setUpdate={setUpdate}
              />
            ))}
        </Row>
      </Col>
    </Row>
  );
}

export default FormProduct;
