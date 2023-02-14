import { useState,useRef } from 'react';
import './App.css';
import "./SlideBar";
import SlideBar from './SlideBar';
import OptionBar from './OptionBar';
import * as htmlToImage from 'html-to-image';


function App() {
  const DEFAULT_OPTIONS = [
    {
      name: 'Brightness',
      property: 'brightness',
      value: 100,
      range: {
      min: 0,
      max: 200
      },
      unit: '%'
    },
    {
      name: 'Contrast',
      property: 'contrast',
      value: 100,
      range: {
      min: 0,
      max: 200
      
      },
      unit: '%'
      },
  
      {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
        min: 0,
        max: 200
        },
        unit: '%'
        },

  ]
 const [file,setFile] = useState();
 const domEl = useRef(null);


 const [selectedOptionIndex,setSelectedOptionIndex] = useState(0);
 const [options ,setOptions] = useState(DEFAULT_OPTIONS);
 const selectedOption = options[selectedOptionIndex]

 

  function handleChange(e)
  {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  function handleSliderChange({ target }) {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) 
        return option
        return {...option, value: target.value}
      })
    })
  }

  function setStyle()
  {
    
    const filters = options.map(option =>
      {
        return `${option.property}(${option.value}${option.unit})`
      })

      console.log(filters)

      return {filter : filters.join(' ') }
      
      
  }

  const handledownload = async ()=>
  {
    const dataUrl = await htmlToImage.toPng(domEl.current);
 
  // download image
  const link = document.createElement('a');
  link.download = "html-to-img.png";
  link.href = dataUrl;
  link.click();
  }

  

  return (
    <div className="container">
       
      <h2 className='Header'>Add an Image   <input  type="file" onChange={handleChange}></input></h2>
      <div className="ImageStyle" style={setStyle()}>
      <div className="ImageStyle" id='domEL' ref={domEl} style={{backgroundImage : `url(${file})`}}> 

       </div>
      </div>
      <button onClick={handledownload}>Download</button>

      
      <div className='optionBar'> 
        {options.map((option , index) => { 
            return( <OptionBar 
            key={index}
            name = {option.name}
            active = {index === selectedOptionIndex}
            handleClick = {() => setSelectedOptionIndex(index)}
           
            />)
        })}
      </div>
      <div className="SlideBarStyle">
        <SlideBar 
        min = {selectedOption.range.min}
        max = {selectedOption.range.max}
        value = {selectedOption.value}
        handleChange = {handleSliderChange}        
        />
      </div>
    </div>

    
  );
}

export default App;
