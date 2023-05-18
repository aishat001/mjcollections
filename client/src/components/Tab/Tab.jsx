import React from 'react'
import "./Tab.css"
const Tab = ({item, selected, setselected, itemMain }) => {
    
  return (
    <div key={item.id} className={`tab pointer ${selected === item.id ? "active" : ""}`} onClick={() => setselected(item.id)}>{item.title}</div>

  )
}

export default Tab