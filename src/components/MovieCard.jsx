// ASSIGNED TO GIORGIO
// This needs to take props like img src from Movie Gallery

import { Col, Image, Button } from "react-bootstrap"
import "./MovieCard.css" 
import CommentArea from "./CommentArea"
import { useState } from "react"
import {useNavigate } from 'react-router-dom'


const  MovieCard = (props) => {
  const [selected, setSelected] = useState(false)
  const navigate = useNavigate()
 
 /* const toggleState = () => {
        if (selected === false) {
          setSelected(true, 
          )
      
      
        } else {
          setSelected(true, 
          )
      
        }
      } */

    return (
        <Col className="px-1 mb-1" xs={8} sm={3} md={2}>
        {selected && (<CommentArea show="true" title = {props.title} id = {props.id}/>)}
        <Image onClick={() => {
            setTimeout(() => {
              navigate('/details/' + props.id)
            }, 500)}} fluid className="w-100 h-100 main-image" key={props.id} alt="movieposter" src={props.img} />
        </Col>
        
      ) 
}

export default MovieCard
