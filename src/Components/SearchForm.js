import React from 'react'
import { Form, Col } from 'react-bootstrap'

const SearchForm = props => {
    return (
        <Form className="mb-4">
        <Form.Row className="align-items-end">
          <Form.Group as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control  name="description" type="text" />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Location</Form.Label>
            <Form.Control  name="location" type="text" />
          </Form.Group>
          <Form.Group as={Col} xs="auto" className="ml-2">
            <Form.Check  name="full_time" id="full-time" label="Only Full Time" type="checkbox" className="mb-2" />
          </Form.Group>
        </Form.Row>
      </Form>
    )
}


export default SearchForm;
