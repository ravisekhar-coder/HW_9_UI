import React, { useState } from 'react';

import axios from 'axios';

import {Button, Card, Form } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";


export function CreateAnimal() {

    const [animalName, setAnimalName] = useState('');
    
    const [animalDescription, setAnimalDescription] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:4000/api/createUser', {
                animalName, animalDescription
            }, {
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
              }
            })
            alert(`user ${animalName} has been created`);
            navigate('/animalsList');
        }catch(err){
           console.log(err.message);
        }

    }

  return (
    <Card style={{width:'50%', marginLeft:'20%', marginTop:'5%'}}>
    <Card.Header>Create Animal</Card.Header>
    <Card.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Animal Name</Form.Label>
        <Form.Control type="text" placeholder="Enter animal name" value={animalName} onChange={(e)=>setAnimalName(e.target.value)}/>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description </Form.Label>
        <Form.Control type="text" placeholder="enter descriptiom" value={animalDescription} onChange={(e)=>setAnimalDescription(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Animal
      </Button>
    </Form>
    </Card.Body>
  </Card>
  )
}

