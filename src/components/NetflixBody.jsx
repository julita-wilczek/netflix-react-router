
import { Container} from "react-bootstrap";
import MovieGallery from "./MovieGallery"
import { Component } from 'react';
import "./NetflixBody.css"

class NetflixBody extends Component {


  render() {
    return (
      <Container>
        <MovieGallery query={this.props.search} />
        <MovieGallery query={"Harry Potter"} />
        <MovieGallery query={"Star Trek"} />
      </Container>
    );
  }
}



export default NetflixBody

