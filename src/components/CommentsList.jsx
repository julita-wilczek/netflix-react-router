import { Component } from "react";
import { Button, Alert } from "react-bootstrap";
class CommentsList extends Component { 

    state = {
        submitted: false,
        viewMode: true
    }

    handleDelete = async (id) => {
         try {
           
       const responseDelete = await fetch('https://striveschool-api.herokuapp.com/api/comments/'+id, {
            method: "DELETE",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZhYTQ4MDgyZWExZDAwMTViYjA1NWQiLCJpYXQiOjE2NDM4MTYwNjQsImV4cCI6MTY0NTAyNTY2NH0.NufHuuX8g0HI0LZVamJvMuYm2a82QnHqM1itLwL2MuU",
            },
          });
    
    console.log(responseDelete)
    this.setState({submitted: true})
    }

    catch (error) {
        console.log(error)
    } 
}

render(){
    return (
    <>
    {this.props.array.map((element) => 
    <p key={element._id}>Comment: {element.comment}, Rated: {element.rate} <Button size="sm" variant="light" onClick={() => {this.handleDelete(element._id)}}>Delete</Button></p> )}
    
    {this.state.submitted && (
          <Alert variant='success'>Comment deleted</Alert>
        )}
    </>
    )
    }
}

export default CommentsList
