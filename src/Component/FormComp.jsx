import React from 'react'
import "./form.css";
import { motion } from "framer-motion";
import SelectedImage from './UseContextImage';
import { nanoid } from 'nanoid';

// import Image from "./image.jpeg";
// import { nanoid } from 'nanoid';
export default function FormComp() {
  // to generate the canvas to write the text on the image 
  const constraintsRef = React.useRef(null);
  const [editableTextTag,setEditableTextTag]=React.useState([]);
  const [counter,setCounter]=React.useState(0);
  const [data,setData]=React.useState([]);
  const canvasRef=React.useRef(null);
  const imgRef=React.useRef(null);
  
  // creating the text for each input field 
  // const handleOnChange=(event)=>{
        
  // }
  
  React.useEffect(()=>{
    const data_set=[]
      data.map((item)=>
        
        data_set.push(
          item.element
      )
    )   
    setEditableTextTag(data_set);
  },[setEditableTextTag,counter,data]);

const handleDownload = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};

  React.useEffect(()=>{
data.forEach((item)=>{
  const element=document.querySelector(`#text--${item.id}`);
  if(element){
    element.addEventListener("mousemove",function(){
        
     //   ().left+"---"+document.querySelector(`#text--${item.id}`)?.getBoundingClientRect().top)
     let x=element?.getBoundingClientRect().left;
     let y=element?.getBoundingClientRect().top;
    
     setData((prevData)=>
            prevData.map((el)=>  
            el.id===item.id?{...el,x_position:x,y_position:y}:el))
             })
  }
})



  },[data])

const handleOnChange=(event,id)=>{
  let valueInput=event.currentTarget.value;

  
  setData(prev=>
    prev?.map((item)=>
     item.id===id?{
      ...item,
      value:valueInput
     }:item
    )
  )
  
}


  function handleOnClick(){
    if(counter<0){
      setCounter(0)
    }
   

    setData(prev=>{
    let temp=nanoid()
    
    return [...prev,{
      id:temp ,
      value:'',
      element:(
      <motion.div 
        draggable={true}
        key={temp}
        id={`text--${temp}`}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        className="box--image mt-[5%]"
        onDrag={(event,info)=>handleDragableElement(event,info,temp)}
        >
        
        <input  
           className='input--tag'
           name={`text-${temp}`}
          //  accessing the current value by passing the id to be matched in current set of objects
           value={prev?.find((item)=>item.id===temp?item.value:'')}
           onChange={(e)=>handleOnChange(e,temp)}
           type="text"
           />
        </motion.div>),
       
        x_position:'',
        y_position:''

    }]


    })
    setCounter(prev=>prev+1);
  }
  const handleOnClickRemove=()=>{
    setCounter(prev=>prev-1);
    data.pop();
  }
  

  const selectedImage=React.useContext(SelectedImage);

  const handleDragableElement=(event,info,id)=>{
    const canvas=canvasRef.current;
    if(!canvas) return;

    const rect=canvas.getBoundingClientRect();
    const x=((info.point.x-rect.left)/canvas.width)*100;
    const y=((info.point.y-rect.top)/canvas.height)*100;

    setData(prev=>
    prev.map((item)=>
      item.id===id?{...item,x_position:x,y_position:y}:item
    )

    )}
    React.useEffect(()=>{
      const canvas=canvasRef.current;
      const img=imgRef.current;
    
      if(!canvas|| !img) return;
       
      const ctx=canvas.getContext("2d");
      if(!ctx) return; 
    
      canvas.width=img.width;
      canvas.height=img.height;
       
      const drawImageOnCanvas = (text,x_axis,y_axis) => {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        console.log("Position: "+text+"--"+x_axis+"--"+y_axis)
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";  
        
      //  there is some mistake in the code white rendering on drag event need to fix 
        ctx.fillText(text,x_axis,y_axis);
      };
    
    
       
       if(data.length===0) return;
          drawImageOnCanvas(data[0].value,data[0].x_position,data[0].y_position);

        },[data]);
  return (
    <div className='mt-10 h-[350px] h-[500px]  w-[100%] flex position-absolute border border-sky-500'>
  
<div className='w-[20%] border border-sky-500 ml-[5%] mt-[10px] mb-[10px]'>

<div className="w-[90%] ml-[5%] p-[10px] mt-[5px] btn---text--area border border-sky-500">
  <p className='text-white text-center ' onClick={handleOnClick} id="add--tag">Add</p>
  </div>
  
  <div className="w-[90%] ml-[5%] p-[10px] mt-[5px] btn---text--area border border-sky-500">
  <p className='text-white text-center ' onClick={handleOnClickRemove}>remove</p>
  </div>
</div>
  
  <div ref={constraintsRef} className='relative div---image---tag w-[60%] ml-[10%] mt-[10px] mb-[10px] border border-sky-500'>

    <img
    src={selectedImage.selectedImage.image}
    className=" top-0 left-0 absolute w-[96%] ml-[2%] h-[92%] mt-[2%]"  alt=""/>

    <canvas className='top-0 left-0 absolute w-[96%] ml-[2%] h-[92%] mt-[2%]'  ref={canvasRef}></canvas>
  {editableTextTag}

  </div>

  <div className=" justify-center mt-[5%]">
          <button 
            onClick={handleDownload} 
            className="p-[10px] bg-sky-500 text-white rounded">
            Download
          </button>
        </div>
    </div>
  )
}
