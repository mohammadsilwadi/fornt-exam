import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { withAuth0 } from '@auth0/auth0-react';
import Forma from'./Forma'
class FavFruit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      favFruit:[],
      show:false
    }
  }
  componentDidMount(){
    const {user}=this.props.auth0;
    const email= user.email;
    axios.get(`http://localhost:8001/getFav?email=${email}`).then((result) => {
      this.setState({
        favFruit:result.data
      })
    })
  }
  deleteFav=(id)=>{
    const {user}=this.props.auth0;
    const email= user.email;
    axios.delete(`http://localhost:8001/delete/${id}?email=${email}`).then((result) => {
      this.setState({
        favFruit:result.data
      })
    })
  }
  handleClose=()=>{
    this.setState({
      show:false
    })
  }
  showForm=(item)=>{
    this.setState({
      name:item.name,
      image:item.image,
      price:item.price,
      id:item._id,
      show:true
    })
  }
  update=(e)=>{
e.preventDefault()
const {user}=this.props.auth0;
const email= user.email;
let obj={
  email:email,
  name:e.target.name.value,
  image:e.target.image.value,
  price:e.target.price.value,
  show:false
}
axios.put(`http://localhost:8001/update/${this.state.id}`,obj).then((result) => {
  this.setState({
    favFruit:result.data
  })
})
  }
  render() {
    return(
      <>
        <h1>My Favorite Fruits</h1>
        {this.state.favFruit.map((item) => {
          return(
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={ item.image } />
          <Card.Body>
            <Card.Title>{ item.name }</Card.Title>
            <Card.Text>
            { item.price }
            </Card.Text>
            <Button variant="danger"
            onClick={()=>this.deleteFav(item._id)}
             >delete</Button> 
              <Button variant="primary"
            onClick={()=>this.showForm(item)}
             >update</Button> 
          </Card.Body>
        </Card>)

        })}
        <Forma
        updatefav={this.update}
        showForm={this.showForm}
        handleClose={this.handleClose}
        name={this.state.name}
        price={this.state.price}
        image={this.state.image}
        show={this.state.show}       
        />
      </>
    )
  }
}

export default withAuth0(FavFruit);
