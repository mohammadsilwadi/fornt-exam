import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export class Forma extends Component {
    render() {
        return (
            <div>
               <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>UPDATE FAV FRUITS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={(e)=>this.props.updatefav(e)}>
  <Form.Group className="mb-3" >
    <Form.Label>name</Form.Label>
    <Form.Control type="text" name='name' defaultValue={this.props.name}/>
    <Form.Label>image</Form.Label>
    <Form.Control type="text" name="image" defaultValue={this.props.image} />
    <Form.Label>price</Form.Label>
    <Form.Control type="text" name="price" defaultValue={this.props.price} />
  </Form.Group>
  <Button variant="primary" type="submit" onClick={this.props.handleClose}>
    Submit
  </Button>
</Form>
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>  
            </div>
        )
    }
}

export default Forma
