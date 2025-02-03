import React from 'react'
import "./form.css";
import { motion } from "framer-motion";
import SelectedImage from './UseContextImage';
import { nanoid } from 'nanoid';
// import { nanoid } from 'nanoid';
export default function FormComp() {
  const constraintsRef = React.useRef(null);
  const [editableTextTag,setEditableTextTag]=React.useState([]);
  const [counter,setCounter]=React.useState(0);
  const [data,setData]=React.useState([]);
  const [selected,setSelected]=React.useState("");

  // creating the text for each input field 
  // const handleOnChange=(event)=>{
        
  // }

  
  const handleSelectedDataToRemove=(id)=>{
    setSelected(id)
  }
  
  React.useEffect(()=>{
    const data_set=[]
      data.map((item)=>
        
        data_set.push(
          <motion.div 
        onClick={()=>handleSelectedDataToRemove()}
        key={item.id}
        id={`text--${item.id}`}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        className="box--image mt-[5%]">
        
        <input  
           className='input--tag'
           name={`text-${item.id}`}
           
           type="text"
           />
        </motion.div>
      )
    )
    
    
    
    setEditableTextTag(data_set);
  },[setEditableTextTag,counter,data]);


  React.useEffect(()=>{
    data.map((item)=>
        document.querySelector(`#text--${item.id}`)?.addEventListener('mousemove',function(){
      // console.log(document.querySelector(`#text--${item.id}`)?.getBoundingClientRec
      // 
      //   ().left+"---"+document.querySelector(`#text--${item.id}`)?.getBoundingClientRect().top)
        let x=this?.getBoundingClientRect().left;
        let y=this?.getBoundingClientRect().top;
        console.log(x+"--"+y)
        })

    )
  })


  const handleOnClick=()=>{
    if(counter<0){
      setCounter(0)
    }
   

    setData(prev=>
    [...prev,{
      id:nanoid(),
      value:''
    }]
    )
    setCounter(prev=>prev+1);
  }
  const handleOnClickRemove=()=>{
    setCounter(prev=>prev-1);
    data.pop();
  }
  
  
  const selectedImage=React.useContext(SelectedImage);

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
  {editableTextTag}

  </div>
    </div>
  )
}
