import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { withAuth0 } from '@auth0/auth0-react';
class Home extends React.Component {
constructor(props){
  super(props)
  this.state = {
    friut:[]
  }
}
componentDidMount(){
  axios.get('http://localhost:8001/getAll').then((result) => {
    this.setState({
      friut:result.data
    })
  })
}
addFruit=(item)=>{
  const {user}=this.props.auth0;
  const email= user.email;
  let obj={
    name:item.name,
    price:item.price,
    image:item.image,
    email:email
  }
  axios.post('http://localhost:8001/add',obj)
}
  render() {
    return (
      <>
        <h1>API Fruits</h1>
        {this.state.friut.map((item) => {
          return(
            
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={ item.image } />
          <Card.Body>
            <Card.Title>{ item.name }</Card.Title>
            <Card.Text>
            { item.price }
            </Card.Text>
            <Button variant="primary"
            onClick={()=>this.addFruit(item)}
            >add</Button>
          </Card.Body>
        </Card>)
        })}
      </>
    )
  }
}

export default withAuth0(Home);
