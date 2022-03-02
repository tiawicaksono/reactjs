import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { API_URL } from "../utils/api";
import axios from "axios";
import ListProduct from "./ListProduct";

const defaultValue = {
  name: "",
  description: "",
  price: "",
  qty: "",
  image: "",
};
function FormProduct() {
  const [data, setData] = useState(defaultValue);
  const [posts, setPosts] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [show, setShow] = useState({
    searchNama: "show",
    searchPrice: "hide",
    searchQty: "hide",
  });
  const [sorting, setSorting] = useState({});

  /**
   * SEARCH BOX
   */
  const handleSelectSearchBox = async (params) => {
    if (params === "name") {
      setShow({
        searchNama: "show",
        searchPrice: "hide",
        searchQty: "hide",
      });
    } else if (params === "price") {
      setShow({
        searchNama: "hide",
        searchPrice: "show",
        searchQty: "hide",
      });
    } else {
      setShow({
        searchNama: "hide",
        searchPrice: "hide",
        searchQty: "show",
      });
    }
  };

  const handleSortingSearchBox = async (params) => {
    console.log(params);
  };
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
    const response = await axios(API_URL);
    setPosts(response.data);
  }, []);
  useEffect(() => {
    showData();
  }, []);

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
        <Form className="mb-2">
          <Row>
            <Col></Col>
            <Col md={8}>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="name / description"
                    className={show.searchNama}
                  />
                  <div className={show.searchPrice}>
                    <Row>
                      <Col>
                        <Form.Control placeholder="price min" />
                      </Col>
                      <Col>
                        <Form.Control placeholder="price max" />
                      </Col>
                    </Row>
                  </div>

                  <div className={show.searchQty}>
                    <Row>
                      <Col>
                        <Form.Control placeholder="qty min" />
                      </Col>
                      <Col>
                        <Form.Control placeholder="qty max" />
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col>
                  <Form.Select
                    onChange={(e) => handleSelectSearchBox(e.target.value)}
                  >
                    <option value="name">Name / Description</option>
                    <option value="price">price</option>
                    <option value="qty">qty</option>
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Select
                    onChange={(e) => handleSortingSearchBox(e.target.value)}
                  >
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                    <option value="qty_asc">qty : Rendah ke Tinggi</option>
                    <option value="qty_desc">qty : Tinggi ke Rendah</option>
                  </Form.Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <Row>
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
