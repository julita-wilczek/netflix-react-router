// ASSIGNED TO GIORGIO
// This takes prop from it's parent (Netflix Body)
// and uses it to fetch array of objects
// and then passes props of the object to it's child (Movie Card)

import { Row, Spinner } from "react-bootstrap";
import MovieCard from "./MovieCard";

import { Component} from "react";

class MovieGallery extends Component {
  state = {
    movies: [],
    isLoading: true,
  };


  galleryOnChange = async () => {

    try {
      console.log(this.state.searchQuery);
      this.setState({ searchQuery: this.props.query });
      

      let response = await fetch(
        "http://www.omdbapi.com/?apikey=a0d093ea&s=" + this.props.query
      );
      if (response.ok) {
        let data = await response.json();
        this.setState({ movies: data.Search });
        
      } else {
        alert("something wrong with the data");
      }
    } catch (error) {
      console.log(error);
    }

  }


  componentDidMount = async () => {
    try {

      let response = await fetch(
        "http://www.omdbapi.com/?apikey=a0d093ea&s=" + this.props.query
      );
      if (response.ok) {
        let data = await response.json();
        this.setState({ movies: data.Search });
        this.setState({isLoading: false})
      } else {
        alert("something wrong with the data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
      
      <h4 className="mb-3 mt-5 ml-n2">{this.props.query} </h4>
      {this.state.isLoading && (<Row className="d-flex justify-content-center"><Spinner animation="border" variant="success" /></Row>)}
      <Row className="g-1">
        {this.state.movies.filter((movie, index) => index < 6).map((movie) => (
          <MovieCard key={movie.imdbID} id={movie.imdbID} img={movie.Poster} title={movie.Title} />
        ))}
      </Row>
      </>
    );
  }
}

export default MovieGallery;
