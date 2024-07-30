function filterName(arr, query) {
   console.log('query:', query.toLowerCase())
   console.log('arr:', arr)
   return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()))
}

export default filterName