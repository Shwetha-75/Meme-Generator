import React from 'react'
import "./form.css";
import { motion } from "framer-motion";
import SelectedImage from './UseContextImage';
// import { nanoid } from 'nanoid';
export default function FormComp() {
  const constraintsRef = React.useRef(null);
  const [editableTextTag,setEditableTextTag]=React.useState([]);
  const [counter,setCounter]=React.useState(0);


  React.useEffect(()=>{
    const data_set=[]
    for(let i=0;i<counter;i++){
      data_set.push(
        <motion.div 
        key={i}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
       
        className="box--image"
      >
        
        <input 
           
           className='input--tag'
           type="text"
           />
        </motion.div>
      )
    }

    setEditableTextTag(data_set);
  },[editableTextTag,counter])


  const handleOnClick=()=>{
    if(counter<0){
      setCounter(0)
    }
    setCounter(prev=>prev+1);
  }
  const handleOnClickRemove=()=>{
    setCounter(prev=>prev-1);

  }
  const selectedImage=React.useContext(SelectedImage);
 console.log(selectedImage.selectedImage)
  return (
    <div className='mt-10 h-[350px] h-[500px]  w-[100%] flex position-absolute border border-sky-500'>
  
<div className='w-[20%] border border-sky-500 ml-[5%] mt-[10px] mb-[10px]'>

<div className="w-[90%] ml-[5%] p-[10px] mt-[5px] btn---text--area border border-sky-500">
  <p className='text-white text-center ' onClick={handleOnClick}>Add</p>
  </div>
  
  <div className="w-[90%] ml-[5%] p-[10px] mt-[5px] btn---text--area border border-sky-500">
  <p className='text-white text-center ' onClick={handleOnClickRemove}>remove</p>
  </div>
</div>
  
  <div ref={constraintsRef} className='relative div---image---tag w-[60%] ml-[10%] mt-[10px] mb-[10px] border border-sky-500'>

    <img
    src={selectedImage.selectedImage.image}
    className=" top-0 left-0 absolute w-[96%] ml-[2%] h-[92%] mt-[2%]"  alt=""/>
  {editableTextTag}

  </div>
  
 


    </div>
  )
}
