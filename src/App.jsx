import { useState, useEffect} from 'react'
import axios from 'axios'
import personService from './services/persons'
import Person from './components/Person'
import filterName from './components/filterName'
import findItem from './components/findItem'
import Notification from './components/Notification'
 
const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [resultMessage, setResultMessage] = useState('')
  
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
          console.log('promise fulfilled', response.data)
          setPersons(response.data)
      })
  }, [persons])

  console.log('render', persons.length, 'persons')
  
  const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
  }
 
 const addPerson = (event) => {
    
   console.log('button clicked', event.target)

   const getItem = findItem(persons, newName)
   if (typeof getItem != "undefined") {
     console.log('person exists, id: ', getItem.id )
       // if person name already exists, ask if update the phone number
     if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
       console.log('confirm to change phone')
       const personObject = {
         name: newName,
         number: newNumber,
         id: getItem.id,
     }
     personService
       .update(getItem.id, personObject)
       .then(response => {
         console.log(response)
      }) 
       .catch ((error) => {    
         console.log(error.message)
         setResultMessage(`Error: Information of ${newName} has already been removed from server`)
         setTimeout(() => {setResultMessage(null)}, 300000)
      })
     }
   }
             // add a new person object
   else {                                
     console.log('new person')
     console.log('persons.length-1:', persons.length-1)
     console.log('last id:', persons.at(persons.length-1).id) 
  
     let newID = (persons.at(persons.length-1).id)
     newID = Number(newID) + 1
     console.log('new ID:', newID)
     console.log('pause here')
     
     const personObject = {
       name: newName,
       number: newNumber,
       id: newID.toString(),
     }
     personService
        .create(personObject)
        .then(response => {
         console.log('add response: ', response)
        
    })
     
      setResultMessage(`Added ${newName}`)
      setTimeout(() => {setResultMessage(null)}, 300000)
     //alert(`Added ${newName}`)
     
     setPersons(persons.concat(personObject))
    
      setNewName('')
      setNewNumber('')
     
      console.log('personObject:', personObject)    
   }
 }
  
 const handleFilterChange = (event) => {
      console.log('target:',event.target.value)
      setNewFilter(event.target.value)
      
      console.log('filter:', filter)
      // obtained the filtered name list  
      // use 'event.target.value' instead of 'filter' due to async in settng states
      const filteredNames = filterName (persons.map(person => person.name),  event.target.value)
      
      console.log('filter:', filter, 'filtered Name:', filteredNames)
  }

 // extract the list of names filtered by the filter
 const extractedNames = filterName (persons.map(person => person.name),  filter)
 console.log('extracted Names:', extractedNames)
   
 // for each extracted name, extract the corresponding person entry by calling findItem()
 const showItems = extractedNames.map((extractedName) => findItem(persons, extractedName))
 console.log('extractedItems:', showItems)

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message = {resultMessage} />
      <div>
         filter shown with 
         <input value={filter}
                onChange={handleFilterChange}
           />
      </div>
      <h2> add a new </h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
                       onChange={handleNameChange}
                 />
        </div>
        <div>
          number: <input value={newNumber}
                       onChange={handleNumberChange}
                 />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {showItems.map(showItem => 
          <Person key={showItem.name} name={showItem.name} number={showItem.number} id={showItem.id} persons={persons} setPersons={setPersons}/>
        )}
      </ul>
    </div>
  )
}

export default App