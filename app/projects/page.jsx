"use client"
import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const page = () => {
  
const [loading, setLoading] = useState(true)

 useEffect(() => {
  const timer = setTimeout( ()=> {
    setLoading(true)
  }, 10000)

  return ()=> clearTimeout(timer)
 },[]);


   
  return (
    <>
     {loading ? (
                    <div className="flex justify-center items-center h-screen z-50 bg-gradient-to-r from-gray-900 via-black to-orange-400">
                     
                      <h1 className="text-xl lg:text-4xl font-extrabold z-50 tracking-wide leading-tight text-white relative">Loading Projects</h1> <br />
                      <LoaderCircle  size="50" speed="1.10" color="orange" className='animate-spin'/>
                      <img
                        src="logo.png"
                        alt="My Logo"
                        className="h-30 lg:h-30 mt-10 animate-pulse absolute top-30 left-0 right-0 bottom-0 mx-auto"
                      />
                    </div>
                  ) : (
                    
                    <header>
                    <div>
                     <h1>Hello this my projects page</h1>
                    </div>
                  </header>
         )
        }
    </>
  )
}

export default page
