import React, { Component, useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { API_URL } from "../utils/constanta";
import axios from "axios";
import ListProduct from "./ListProduct";
import ReactPaginate from "react-paginate";

export default class ListProductComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produks: [],
    };
  }
  getPostData = () => {
    axios
      .get(API_URL)
      .then((res) => {
        const produks = res.data;
        this.setState({ produks });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleRemove = (data) => {
    axios.delete(API_URL + data).then((res) => {
      this.getPostData();
    });
  };

  componentDidMount() {
    this.getPostData();
  }

  render() {
    const { produks } = this.state;

    /**
     * PAGINATION
     */
    // const [posts, setPosts] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [postPerPage, setPostPerPage] = useState(0);

    // useEffect(() => {
    //   const fetchPost = async () => {
    //     const res = await axios.get(API_URL + "product");
    //     setPosts(res.data);
    //     setLoading(false);
    //   };
    //   fetchPost();
    // }, []);

    // console.log(posts);
    // const handlePageClick = (data) => {
    //   console.log("asd");
    // };
    return (
      <Row>
        {produks &&
          produks.map((dataProduk) => (
            <ListProduct
              key={dataProduk.id}
              dataProduk={dataProduk}
              remove={this.handleRemove}
            />
          ))}
      </Row>
      /*{ <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={10}
          marginPagesDisplayed={3}
          pageRangeDisplayed={6}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
        /> }*/
    );
  }
}
