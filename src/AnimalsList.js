import React, {useEffect, useState } from 'react'
import axios from 'axios';

import { Table, Button } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";

export function AnimalsList() {
    const [animalsList, setAnimalsList]= useState([]);
    const navigate = useNavigate();

    const getAnimalsList = async () =>{

        const { data } = await axios.get('http://localhost:4000/api/usersList', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        setAnimalsList(data);
        console.log(data, 'animalsList');

    }

    const handleDelete = async (animalId)=>{

      const res = window.confirm('are you sure you want to delete?');
      if(res){
        const { data } = await axios.delete(`http://localhost:4000/api/deleteUser/${animalId}`,  {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });

        alert('animal has been deleted');
        navigate(0);
      }


    }

    useEffect(()=>{

        getAnimalsList()
    },[])

    console.log(animalsList, 'animalsList test')
  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Animal name</th>
        <th>Description</th>
        <th>Edit Section</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {
            animalsList.length>0 && animalsList.map((item,index)=>{
                        return (<tr>
                            <td>{item.animalId}</td>
                            <td>{item.animalName}</td>
                            <td>{item.animalDescription}</td>  
                            <td><Button variant="secondary" onClick={()=>navigate(`/animalsList/${item.animalId}`)}>Edit Animal</Button>{' '}</td>                       
                            <td><Button variant="secondary" onClick={() =>handleDelete(item.animalId)}>Delete Animal</Button>{' '}</td>                       
                        </tr>)
            })
        }
      
     
    </tbody>
  </Table>
  )
}

