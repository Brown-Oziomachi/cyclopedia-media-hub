import Link from 'next/link';
import React from 'react'

const AdminProfile = () => {
  return (
      <div className="lg:fl lg:items-center lg:space-x-4 py-10">
          <hr />
      <h1 className="text-3xl font-bold mb-4 text-center">ABOUT THE AUTHOR</h1>

      <div>
        <img
          src="/brown.jpg"
          alt="Brown Oziomachi"
          className="rounded-full w-32 h-32 object-cover mx-auto lg:mb-20 mb-4"
        />
      <div className='lg:-mt-20'>
        <p className="text-gray-600 p-4 text-center ">
          Brown Oziomachi is a passionate writer and researcher, a software <br />
          developer, and the director of <span className='font-bold'>The Cyclopedia</span>.
        </p>
      </div>
      </div>
      <p className="text-center uppercase text-orange-600 font-bold hover:text-orange-800">
        <Link href="/global">View more articles</Link>
          </p>
          <hr />
    </div>
  );
}

export default AdminProfile
