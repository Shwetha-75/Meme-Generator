import React from 'react'
import "./form.css";
// import { motion } from "framer-motion";
import SelectedImage from './UseContextImage';
// import { nanoid } from 'nanoid';

import Draggable from './DraggableComponent/Draggable';
import { nanoid } from 'nanoid';

// import Image from "./image.jpeg";
// import { nanoid } from 'nanoid';
export default function FormComp() {
  // to generate the canvas to write the text on the image 
  const constraintsRef = React.useRef(null);


  // const [draggableElement,setDraggableElement]=React.useState([]);
  // const [isTextVisible,setIsTextVisible]=React.useState(false);

  const timeOutRef=React.useRef(null);

  const [data,setData]=React.useState([]);
  const [selectedTag,setSelectedTag]=React.useState('');


  function handleOnClick(){

   
    setData(prev=>{
      let temp=nanoid();
      return [...prev,{
            id:temp,
            value:'',
            x_position:0,
            y_position:0,
            status:false
      }]
    });



  }
  
  // creating the text for each input field 
  // const handleOnChange=(event)=>{
        
  // }

  // const handleDraggableStart=()=>{
  //   setIsTextVisible(true);
  // };

  // const handleDraggableEnd=()=>{
  //   setIsTextVisible(false);
  // }

  
  const handleOnClickDraggableElement=(id)=>{
        setSelectedTag(id);
  }
  const handleOnChangeInputTextOnImage=(e,id)=>{
         e.preventDefault();
         let val=e.target.value;

         if(timeOutRef.current){
          clearTimeout(timeOutRef.current)
         }
   timeOutRef.current=setTimeout(()=>{

      setData((prev)=>
        prev.map((item)=>
          item.id===id?{
            ...item,
            value:val
          }:{
            ...item
          }
        )
      )
    },5000)



  };

  const handleOnMouseMove=(id,x_pos,y_pos)=>{
      setData((prev)=>
         prev.map((item)=>
           item.id===id?{
            ...item,
            x_position:x_pos,
            y_position:y_pos
           }:{
            ...item
           }
        )
      )

  }

   console.log(data)

  const handleOnClickRemove=(id)=>{
     const updateData=data.filter((item)=> item.id!==id)

    setData(updateData);

  }
  const selectedImage=React.useContext(SelectedImage);
  
  return (
    <div className='mt-10 h-[350px] h-[500px]  w-[100%] flex position-absolute border border-sky-500'>
  
<div className='w-[20%] border border-sky-500 ml-[5%] mt-[10px] mb-[10px]'>

<div className="w-[90%] ml-[5%] p-[10px] mt-[5px] btn---text--area border border-sky-500">
  <p className='text-white text-center ' onClick={handleOnClick}  id="add--tag">Add</p>
  </div>
  

</div>
  
  <div ref={constraintsRef} className='outer-border relative div---image---tag w-[60%] ml-[10%] mt-[10px] mb-[10px]'>

    <img
    src={selectedImage.selectedImage.image}
    className={`top-0 left-0 absolute w-[100%] h-[100%] image--tag--meme ${data.length!==0?"image--tag--meme--active":"image--tag--meme--deactive"} `}  alt=""/>

  
  {/* <Draggable/> */}

  {
    data.map((item)=>
      <Draggable
       key={item.id}
       id={item.id}
       onChange={handleOnChangeInputTextOnImage}
      
       onRemove={handleOnClickRemove}
       onMouseMove={handleOnMouseMove}
      onClick={handleOnClickDraggableElement}
    />
    )
  }
  </div>

  <div className=" justify-center mt-[5%]">
          <button 
            className="p-[10px] bg-sky-500 text-white rounded">
            Download
          </button>
        </div>
    </div>
  )
}
