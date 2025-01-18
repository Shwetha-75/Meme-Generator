import React from 'react'
import "./form.css";
import DataSet from "./single_pics";
export default function Card() {
  const [selectSinglePics,setSinglePics]=React.useState(false);



  const [data,setData]=React.useState(DataSet)

  const handleOnClick=(id)=>{

    let copy_data=[...data];
    copy_data=copy_data.map((item)=>(
      item.id===id?{...item,status:true}:{...item,status:false}
    ))
   setData(copy_data);

  }
  const handleOnClickCard=()=>{
    setSinglePics(prev=>!prev)
  }

    const array=[["Hello","Paragraph"],["Hello","Paragraph"],["Hello","Paragraph"]].map((item,index)=>(
        <div className='w-[30%] border border-sky-500 ml-[2%] h-[250px]' onClick={handleOnClickCard} key={index}>
        <div className="h-[78%] mt-[2%] w-[96%] ml-[2%] border border-sky-500">
        <h1 className='text-white'>{item[0]}</h1>
        </div>
        <div className='h-[20%] '>
            <h2 className='text-white'>{item[1]}</h2>
        </div>
    </div>
    ))


  return (
    <div>

    <div className="w-[80%] ml-[10%] mt-[5%]  flex">
        {array}
    </div>
    {selectSinglePics && <div className='popup--display' >
      <p onClick={handleOnClickCard}>cancel</p>
    <div className="w-[80%] mb-[3%]  row border border-sky-500">
     {data.map((item)=>(
      <div key={item.id} className={`column border border-sky-900 ${item.status?'active':''}`}  onClick={()=>{handleOnClick(item.id)}}>
      <div className={`card relative w-[96%] ml-[2%] h-[94%] mt-[2%] ${item.status?'active':''}`} >
        
      <img src={item.image} alt='' className='absolute top-0 left-0 w-full h-full '/>
      </div>
    </div>
     )) }
    </div>
  </div>}
    </div>
  )
}
