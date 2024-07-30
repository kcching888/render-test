const Notification = ({ message}) => {
  if (message === '') {
    console.log('pause empty')
    //alert('pause empty')
    return null
  }
  else {
    let msgHeader = message.split(":")[0]
    console.log('message:', message, 'split:', msgHeader, 'len:', msgHeader.length)
    //alert(`pause : ${message}`)
    //if (message.split(":")[0] === "Error")
    if (msgHeader === "Error")  
      return (
        <div className="error">
          {message}
        </div>
      )
    else 
      return (
        <div className="response">
          {message}
        </div>
      )
  }
}

export default Notification