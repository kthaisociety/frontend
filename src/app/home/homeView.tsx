import React from 'react'
import {Button} from '@/components/shadcn/button'

const HomeView = () => {
  return (
    <div className='h-[100px] bg-blue-500 text-white align-middle text-center'>
      <h1 className='text-2xl'>Home Page!!</h1>
        <Button className='bg-blue-800 hover:bg-green-800  hover:duration-700' onClick={()=> alert("you clicked me!") }>Click me</Button>
    </div>
  )
}

export default HomeView