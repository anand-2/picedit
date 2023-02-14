import React from 'react'

export default function SlideBar(props) {
  return (
    <div>
        <input type="range" className='slider'  min={props.min} max={props.max} value={props.value} onChange={props.handleChange}/>
    </div>
  )
}
