import { Component } from 'react'
import { Form, Button, Alert} from 'react-bootstrap'

class CommentsForm extends Component {
  state = {
    review: {
      comment: '',
      rate: '1',
      elementId: this.props.id,
    },
    commentMode: true,
    submitted: false,
  }

  handleChange = (property, value) => {
    this.setState({
      review: {
        ...this.state.review,
        [property]: value,
      },
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/',
        {
          method: 'POST',
          body: JSON.stringify(this.state.review),
          headers: {
            'Content-type': 'application/json',
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZhYTQ4MDgyZWExZDAwMTViYjA1NWQiLCJpYXQiOjE2NDM4MTYwNjQsImV4cCI6MTY0NTAyNTY2NH0.NufHuuX8g0HI0LZVamJvMuYm2a82QnHqM1itLwL2MuU",
          },
        }
      )
      if (response.ok) {
        this.setState({commentMode: false, submitted: true})
        this.setState({
          review: {
            comment: '',
            rate: '',
            elementId: "",
          },
        })
      } else {
        alert('something went wrong! please try again')
        if (response.status === 400) {
          alert('some data was wrong')
        }
        if (response.status === 404) {
          alert('not found')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
    
      <div className='mb-3'>
          {this.state.commentMode && (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Choose your rate</Form.Label>
            <Form.Control
              as='select'
              value={this.state.review.rate}
              onChange={(e) =>
                this.handleChange('rate', e.target.value)
              }
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
    
          <Form.Group>
            <Form.Label>Your comment</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={this.state.review.comment}
              onChange={(e) =>
                this.handleChange('comment', e.target.value)
              }
            />
          </Form.Group>
          <Button variant='secondary' size="sm" type='submit'>
            SEND COMMENT
          </Button>
        </Form>)}
        {this.state.submitted && (
          <Alert variant='success'>Comment posted</Alert>
        )}
      </div>
    )
  }
}

export default CommentsForm
