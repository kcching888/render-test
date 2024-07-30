import React from 'react'
import personService from '../services/persons'

function Person({name, number, id, persons, setPersons}) {
  const handleDelete = (event) => {
    event.preventDefault()
    const {id} = event.target
    console.log('del event target:', event.target, 'id:', id)
    if (confirm("delete " + name + " ?")) {
      personService
        .del(id)
        .then(response => {
            console.log('del clicked', response.data)
        })
    }
    personService
      .getAll()
      .then(response => {
          console.log('promise fulfilled', response.data)
          setPersons(response.data)
      })
  }
  console.log("person:", name, number, id) 
  return (
      <p> {name} {number} <button type="button" id={id} onClick={handleDelete}>delete</button> </p>
  )
}

export default Person