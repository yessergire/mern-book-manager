import React from 'react'

const Notification = ({ message }) => {
  const display = (message.length === 0) ? 'none' : 'block'
  const noteStyle = {
    display: display,
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={noteStyle}>{message}</div>
  )
}

export default Notification
