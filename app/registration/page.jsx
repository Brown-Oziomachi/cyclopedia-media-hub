"use client"
import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { db3, } from "@/lib/firebaseConfig";
import { getDocs } from 'firebase/firestore';



const page = () => {   
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
  });

  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = async () => {
    
    try {
      const formData = [];
       const querySnapshot =  await getDocs(collection(db3, "webwizcreation"));
       querySnapshot.forEach((doc) => {
        const formData = {id: doc.id, ...doc.data() };
        formData.push(formData)
       })
      setMessage("Registration successful!");
      setFormData({ name: "", email: "", skills: "",  }); // Reset form
    } catch (error) {
      console.error("Error adding document:", error);
      setMessage("Error registering. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const collection =  db3.collection("webwizcreation");
  useEffect(() => {
    fetchData();
  }, []);
}
const [loading, setLoading] = useState(false)

 useEffect(() => {
  const timer = setTimeout( ()=> {
    setLoading(false)
  }, 10000)

  return ()=> clearTimeout(timer)
 },[]);


   
    return (
      <>
       {loading ? (
      <div className="flex justify-center items-center h-screen z-50 bg-gradient-to-r from-gray-900 via-black to-orange-400">
         
       <h1 className="text-xl lg:text-xl font-extrabold z-50 tracking-wide leading-tight text-white relative">Loading Tech form</h1> <br />
      <LoaderCircle  size="50" speed="1.10" color="orange" className='animate-spin'/>
       <img
      src="logo.png"
      alt="My Logo"
       className="h-30 lg:h-30 mt-10 animate-pulse absolute top-30 left-0 right-0 bottom-0 mx-auto"
      />
      </div>
      ) : (
      <section>


      
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-orange-400">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md lg:max-w-lg mt-30">
      <h2 className="text-2xl font-bold mb-4 text-center">Developer Registration</h2>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
      <input
      type="text"
      name="name"
      placeholder="Full Name"
      value={formData.name}
      onChange={handleChange}
      className="w-full p-3 border rounded focus:ring focus:ring-blue-200"
      required
      minLength="3"
      maxLength="50"
      />
      <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      className="w-full p-3 border rounded focus:ring focus:ring-blue-200"
      required
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
      <input
      type="text"
      name="skills"
      placeholder="Skills (e.g., JavaScript, React)"
      value={formData.skills}
      onChange={handleChange}
      className="w-full p-3 border rounded focus:ring focus:ring-blue-200"
      required
      minLength="2"
      maxLength="100"
      />
       <input
      type="tel"
      name="phone"
      placeholder="Phone Number"
      value={formData.phone || ''}
      onChange={handleChange}
      className="w-full p-3 border rounded focus:ring focus:ring-blue-200"
      required
      pattern="[0-9]{10}"
      />
       <textarea
      name="bio"
      placeholder="Short Bio"
      value={formData.bio || ''}
      onChange={handleChange}
      className="w-full p-3 border rounded focus:ring focus:ring-blue-200"
      required
      minLength="10"
      maxLength="200"
      />
       <input
      type="url"
      name="portfolioLink"
      placeholder="Portfolio Link"
      value={formData.portfolioLink || ''}
      onChange={handleChange}
      className="w-full p-3 border rounded focus:ring focus:ring-blue-200"
      />
       <input
      type="url"
      name="githubLink"
      placeholder="GitHub Link"
      value={formData.githubLink || ''}
      onChange={handleChange}
      className="w-full p-3 border rounded focus:ring focus:ring-blue-200"
      />
       <input
      type="url"
      name="linkedinLink"
      placeholder="LinkedIn Link"
      value={formData.linkedinLink || ''}
      onChange={handleChange}
      className="w-full p-3 border rounded focus:ring focus:ring-blue-200"
      />
      <button
      type="submit"
      className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
      >
      Register
      </button>
      </form>
      </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-4">
      <p>Already have an account? <a href="/auth/signin" className="text-cyan-400 hover:underline">Sign In</a></p>
      </div>

      </section>
    )
    }
    </>
    )
}

export default page
