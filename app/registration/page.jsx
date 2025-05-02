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
                    <div className="flex justify-center items-center h-screen z-50 bg-gradient-to-r from-gray-900 via-black to-gray-800">
                     
                      <h1 className="text-xl lg:text-xl font-extrabold z-50 tracking-wide leading-tight text-white relative">Loading Tech form /In Progress/</h1> <br />
                      <LoaderCircle  size="50" speed="1.10" color="orange" className='animate-spin'/>
                      <img
                        src="logo.png"
                        alt="My Logo"
                        className="h-30 lg:h-30 mt-10 animate-pulse absolute top-30 left-0 right-0 bottom-0 mx-auto"
                      />
                    </div>
                  ) : (
                    
                    <header className="flex flex-col justify-center items-center h-screen text-center bg-gray-900 text-white">
                    <div className="space-y-6">
                      <h1 className="text-5xl font-extrabold text-red-500">
                       Tech Registration Form 
                      </h1>
                      <p className="text-lg">
                        Fill your form here
                      </p>
                     
                    </div>
                  </header>
         )
        }
    </>
  )
}

export default page
