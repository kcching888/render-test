  // return the person entry matching the searching name
  function findItem(arr, query) {
     console.log('query item:', query.toLowerCase())
     //let foundItem = {}
     //foundItem = arr.find((el) => el.name.toLowerCase() === query.toLowerCase())
     //console.log('arr:', arr, 'foundItem: ', foundItem)
     return arr.find((el) => el.name.toLowerCase() === query.toLowerCase())
  }

export default findItem