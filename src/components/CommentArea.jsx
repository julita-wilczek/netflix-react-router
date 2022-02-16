import { Component } from "react"
import { Modal, Button, Spinner, Alert } from "react-bootstrap"
import CommentsList from "./CommentsList"
import CommentsForm from "./CommentForm"
import "./CommentArea.css" 


class CommentArea extends Component {
    state = {
        comments: [],
        isLoading: true,
        isError: false,
        isReviewModeOn: false,
        isCommentReadingOn: true,
        visible: true,
        noCommentsYet: false,
      }
    componentDidMount = async () => {

        try {
          let response = await fetch(
            "https://striveschool-api.herokuapp.com/api/comments/", {
            method: "GET",
            headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZhYTQ4MDgyZWExZDAwMTViYjA1NWQiLCJpYXQiOjE2NDM4MTYwNjQsImV4cCI6MTY0NTAyNTY2NH0.NufHuuX8g0HI0LZVamJvMuYm2a82QnHqM1itLwL2MuU",
            },
            }
          )
          if (response.ok) {
            let data = await response.json()
            let filteredData = data.filter(comment => comment.elementId === this.props.id);
            this.setState({
              comments: filteredData,
              isLoading: false,
            })
            if (filteredData.length === 0) {
                this.setState({
                noCommentsYet: true
                })
            }
          } else {
            this.setState({
              isLoading: false,
              isError: true,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }

showForm = () => {
    this.setState({isReviewModeOn: true, isCommentReadingOn: false, noCommentsYet:false})
}

hideModal = () => {
    this.setState({visible: false})
}
render(){
    return (
<>
{this.state.visible && (
<div id="modal">
<Modal show={this.props.show} size="lg" >
 <Modal.Header onClick = {this.hideModal} closeButton>
          <Modal.Title>Reviews for {this.props.title} </Modal.Title>
        </Modal.Header>

  <Modal.Body>
  {this.state.isLoading && (
          <Spinner animation='border' variant='primary' />
        )}
        {this.state.isError && (
          <Alert variant='danger'>Something went wrong 😨</Alert>
        )}
{this.state.noCommentsYet && (<p>No comments on this book yet, you can be first!</p>)}
  {this.state.isCommentReadingOn && (<CommentsList id = {this.props.id} array ={this.state.comments}/>)}
  {this.state.isReviewModeOn && (<CommentsForm id = {this.props.id}/>)}
  </Modal.Body>

  {this.state.isCommentReadingOn && (<Modal.Footer>
  <Button size="sm" variant="secondary" onClick={this.showForm}>Add review</Button>
  </Modal.Footer>)}
</Modal>
</div>)}
</>
    )
    }
}

export default CommentArea