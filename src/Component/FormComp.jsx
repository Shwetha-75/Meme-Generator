import React from 'react'
import "./form.css";


export default function FormComp() {
 
 
  return (
    <div className='mt-10 h-[350px] w-[100%] flex position-absolute'>
  <div className='w-[46%] ml-[2%] border border-sky-500'>
    <form >
    <input className='input--tag w-[80%] ml-[10%] h-[100px]' placeholder='Enter The Top Text'></input>
    <br></br>
    <input className='input--tag w-[80%] ml-[10%] h-[100px]' placeholder='Enter The Bottom Text'></input>
    </form>
  </div>

  
  <div className='w-[46%] ml-[4%] border border-sky-500'></div>
  
 


    </div>
  )
}
