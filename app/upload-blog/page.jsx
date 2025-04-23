"use server";
import { auth } from '@/auth';
import UploadBlog from '@/components/UploadBlog'
import React from 'react'

const page = async () => {
  const session = await auth()
  console.log(session);
  
  
  return (
    <main>
      <UploadBlog session={session}/>
    </main>
  )
}

export default page