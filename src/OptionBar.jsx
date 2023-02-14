
import React from 'react'

export default function OptionBar(props) {
  return (
    <>
    <button  className={`option-item ${props.active ? 'active' : ''}`} onClick={props.handleClick}>{props.name}</button>
   
    </>
  )
}


