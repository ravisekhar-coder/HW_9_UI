import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Editanimal() {
  const { animalId } = useParams();
  const [animalDetails, setAnimalDetails] = useState({
    animalName: "",
    animalDescription: "",
  });

  const navigate = useNavigate();

  const getAnimalDetails = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/usersList/${animalId}`,  {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    );
    setAnimalDetails({ animalName: data[0].animalName, animalDescription: data[0].animalDescription });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.put(`http://localhost:4000/api/updateUser`, {
        animalId,
        animalName: animalDetails.animalName,
        animalDescription: animalDetails.animalDescription,
      },  {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      alert(' Animal updated successfully')

      navigate("/animalsList");

    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAnimalDetails();
  }, []);

  return (
    <Card style={{ width: "50%", marginLeft: "20%", marginTop: "5%" }}>
      <Card.Header>Edit Animal</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>animalId</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Animal Name"
              value={animalId}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Animal Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Animal Name"
              value={animalDetails.animalName}
              onChange={(e) =>
                setAnimalDetails({ ...animalDetails, animalName: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description </Form.Label>
            <Form.Control
              type="text"
              placeholder="enter description"
              value={animalDetails.animalDescription}
              onChange={(e) =>
                setAnimalDetails({ ...animalDetails, animalDescription: e.target.value })
              }
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Edit Animal
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
