import React from 'react'
import Card from './Card';
import FormComp from './FormComp';
import SelectedImage from './UseContextImage';

// creating an use context to store the value of the image 


export default function Main() {
 
  const [selectedImage,setSelectedImage]=React.useState(JSON.parse(localStorage.getItem('selectedImage'))||{});

  React.useEffect(()=>{
    localStorage.setItem('selectedImage',JSON.stringify(selectedImage))
  })

  return (
    <SelectedImage.Provider  value={{selectedImage,setSelectedImage}}>

    <div className='w-[90%] ml-[5%]'>
        <Card/>
        <FormComp/>
    </div>
    </SelectedImage.Provider >
  )
}
