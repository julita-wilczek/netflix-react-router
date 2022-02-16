// ASSIGNED TO MARTIN
// This should contain search bar 
// It needs to pass props to MovieGallery
import { Container, Form, Button } from "react-bootstrap";
import MovieGallery from "./MovieGallery"
import { Component } from 'react';
import "./NetflixBody.css"

class NetflixBody extends Component {
  state = {
    searchQuery: "Star Wars",
    isSearchOn: false,
    isReloadNeeded: true,
  };


  setSearchQuery = (event) => {
    if (event.keyCode === 13) {
    let str = document.getElementById("searchValue").value;
    this.setState({ searchQuery: str })
    this.state.isSearchOn ? this.setState({isSearchOn: false}) : this.setState({isSearchOn: true})
    this.state.isReloadNeeded ? this.setState({isReloadNeeded: false}) : this.setState({isReloadNeeded: true})
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
        {this.state.isSearchOn && (<MovieGallery query={this.state.searchQuery} />)}
        {this.state.isReloadNeeded && (<MovieGallery query={this.state.searchQuery} />)}
        <MovieGallery query={"Harry Potter"} />
        <MovieGallery query={"Star Trek"} />
      </Container>
    );
  }
}



export default NetflixBody

