import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Pagination,
  Row,
  Spinner,
  Container,
} from "react-bootstrap";
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
  sort: "asc",
  q: "",
  cat: "name",
  min: 0,
  max: 0,
};
function FormProduct() {
  const [data, setData] = useState(defaultValue);
  const [posts, setPosts] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [queryParam, setQueryParam] = useState(sortingValue);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const response = await axios(
      `${API_URL}?sort=${queryParam.sort}&cat=${queryParam.cat}&q=${queryParam.q}&page=${page}&min=${queryParam.min}&max=${queryParam.max}`
    );
    setPosts(response.data.data);
    setPagination(response.data);
    setIsLoading(false);
  }, [queryParam, page]);

  useEffect(() => {
    // console.log(queryParam);
    showData();
  }, [queryParam, page]);

  /**
   * SEARCH
   */

  function handleChangeQueryParams(params) {
    setQueryParam(params);
  }

  function renderItem() {
    if (posts) {
      // console.log(posts);
      if (posts.length < 1) {
        return <p>tidak ada</p>;
      }
      return posts.map((produks) => (
        <ListProduct
          key={produks.id}
          dataProduk={produks}
          showData={showData}
          setData={setData}
          setUpdate={setUpdate}
        />
      ));
    }
  }

  function getLastUrl(params) {
    return params.charAt(params.length - 1);
  }
  function renderPagination() {
    if (pagination && pagination.links) {
      return (
        <Pagination>
          {pagination.first_page_url && (
            <Pagination.First onClick={(a) => setPage(1)} />
          )}
          {pagination.prev_page_url && (
            <Pagination.Prev
              onClick={(a) => setPage(getLastUrl(pagination.prev_page_url))}
            />
          )}
          {pagination.links.map((pager, i) => {
            if (i != 0 && i != pagination.links.length - 1) {
              return (
                <Pagination.Item
                  active={pager.active}
                  onClick={(a) => setPage(pager.label)}
                >
                  {pager.label}
                </Pagination.Item>
              );
            }
            return null;
          })}
          {pagination.next_page_url && (
            <Pagination.Next
              onClick={(a) => setPage(getLastUrl(pagination.next_page_url))}
            />
          )}
          {pagination.last_page_url && (
            <Pagination.Last onClick={(a) => setPage(pagination.last_page)} />
          )}
        </Pagination>
      );
    }
  }

  return (
    <Container>
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
          <Row>{renderItem()}</Row>
          <Row>{renderPagination()}</Row>
        </Col>
      </Row>
    </Container>
  );
}

export default FormProduct;
