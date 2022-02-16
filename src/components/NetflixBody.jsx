
import { Container, Form, Button } from "react-bootstrap";
import MovieGallery from "./MovieGallery"
import { Component } from 'react';
import "./NetflixBody.css"

class NetflixBody extends Component {
  state = {
    searchQuery: "Star Wars",
  };


  setSearchQuery = (event) => {
    if (event.keyCode === 13) {
    let str = document.getElementById("searchValue").value;
    this.setState({ searchQuery: str })
  }};

  render() {
    return (
      <Container>
          <Form.Control
            type="text"
            className="w-100 d-inline-block mt-2 mb-n2 mx-n2"
            placeholder="Search here"
            id="searchValue"
            onKeyUp={this.setSearchQuery}
          />
        <MovieGallery query={this.state.searchQuery} />
        <MovieGallery query={"Harry Potter"} />
        <MovieGallery query={"Star Trek"} />
      </Container>
    );
  }
}



export default NetflixBody

