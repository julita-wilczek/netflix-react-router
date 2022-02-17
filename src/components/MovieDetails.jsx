//Create the MovieDetails component for displaying the details 
// and the comments of the selected movie. 
// This info should be fetched every time the MovieDetails component loads.

import { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Spinner, Image, Alert, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound'
import CommentsList from './CommentsList'
import CommentsForm from './CommentForm'

const MovieDetails = () => {

    const params = useParams()
    const [movieToShow, setMovieToShow] = useState(null)
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [noCommentsYet, setNoCommentsYet] = useState(false)
    const [error, setError] = useState(false)
    const [reviewModeOn, setReviewModeOn] = useState(false)
    const [commentReadingOn, setCommentReadingOn] = useState(true)
   
    useEffect (() => {
        fetchData(params.movieId)
        fetchComments()
    }, [])

    useEffect (() => {
      fetchData(params.movieId)
      fetchComments()
  }, [commentReadingOn])

    const fetchData = async (movieId) => {
        try {

            let response = await fetch(
              "http://www.omdbapi.com/?apikey=a0d093ea&i=" + movieId
            );
            if (response.ok) {
              let data = await response.json();
              console.log(data)
              setMovieToShow(data)
              setLoading(false)
            } else {
              alert("something wrong with the data");
            }
          } catch (error) {
            console.log(error);
          }
    }

    const fetchComments = async () => {

        try {
          let response = await fetch(
            "https://striveschool-api.herokuapp.com/api/comments/", {
            method: "GET",
            headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZhYTQ4MDgyZWExZDAwMTViYjA1NWQiLCJpYXQiOjE2NDUwMjYyNzcsImV4cCI6MTY0NjIzNTg3N30.BFQAwEHFhlnBLrJfJy3oV1xft9UXqx8waliq8pH771E",
            },
            }
          )
          if (response.ok) {
            let data = await response.json()
            let filteredData = data.filter(comment => comment.elementId === params.movieId);
            setComments(filteredData,)
            if (filteredData.length === 0) {
                setNoCommentsYet(true)
            }
          } else {
            setLoading(false)
            setError(true)
          }
        } catch (error) {
          console.log(error)
        }
      }

    const postReview = () => {
      setCommentReadingOn(false)
      setNoCommentsYet(false)
      setReviewModeOn(true)
    }

    const refresh = () => {
      setCommentReadingOn(true)
      setReviewModeOn(false)
    }
    return (
        
        <Container>
        {loading && (<Row className="d-flex justify-content-center"><Spinner animation="border" variant="success" /></Row>)}
        {movieToShow && (
          <Row className="justify-content-start">
            <Col style={{width: "300px"}}>
            <Image style={{height: "466px"}} variant='top' src={movieToShow.Poster} />
            </Col>
            <Col style={{color: "black"}}>
            <ListGroup style={{width: "300px"}}>
  <ListGroup.Item>{movieToShow.Title}</ListGroup.Item>
  <ListGroup.Item>{movieToShow.Year}</ListGroup.Item>
  </ListGroup>
            </Col>
            <Col>
        {error && (
          <Alert variant='danger'>Something went wrong 😨</Alert>
        )}
{noCommentsYet && (<p>No comments on this movie yet, you can be first!</p>)}
{commentReadingOn && (<CommentsList id={params.movieId} array ={comments}/>)}
{reviewModeOn && (<CommentsForm id = {params.movieId} refresh = {refresh}/>)}
{commentReadingOn && (
  <Button size="sm" variant="secondary" onClick={() => {postReview()}}>Add review</Button>)}

            </Col>
            </Row>

              )}
              {typeof movieToShow === 'undefined' && <NotFound />}
        </Container>
      )
}


export default MovieDetails
