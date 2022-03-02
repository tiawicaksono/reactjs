import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export const FormSearch = (props) => {
  const [show, setShow] = useState({
    searchNama: "show",
    searchPrice: "hide",
    searchQty: "hide",
  });
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

    const newData = { ...props.queryParam };
    newData.cat = params;

    props.setQueryParam(newData);
  };

  const handleSortingSearchBox = async (params) => {
    const newData = { ...props.queryParam };
    newData.sort = params;

    props.setQueryParam(newData);
    // props.showData();
  };

  const handleSearchSearchBox = async (params) => {
    const newData = { ...props.queryParam };
    newData.q = params;

    props.setQueryParam(newData);
    // props.showData();
  };

  const handlePriceSearchBox = (type, value) => {
    const newData = { ...props.queryParam };
    newData[type] = value;
    // console.log(newData);
    props.setQueryParam(newData);
  };
  return (
    <Form className="mb-2">
      <Row>
        <Col></Col>
        <Col md={8}>
          <Row>
            <Col>
              <Form.Control
                placeholder="name / description"
                className={show.searchNama}
                onChange={(e) => handleSearchSearchBox(e.target.value)}
              />
              <div className={show.searchPrice}>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder="price min"
                      onChange={(e) =>
                        handlePriceSearchBox("min", e.target.value)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="price max"
                      onChange={(e) =>
                        handlePriceSearchBox("max", e.target.value)
                      }
                    />
                  </Col>
                </Row>
              </div>

              <div className={show.searchQty}>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder="qty min"
                      onChange={(e) =>
                        handlePriceSearchBox("min", e.target.value)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="qty max"
                      onChange={(e) =>
                        handlePriceSearchBox("max", e.target.value)
                      }
                    />
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
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="qty_asc">qty : Rendah ke Tinggi</option>
                <option value="qty_desc">qty : Tinggi ke Rendah</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
