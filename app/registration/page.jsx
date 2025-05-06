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
        <div className="flex justify-center items-center h-screen z-50 bg-gradient-to-r from-gray-900 via-black to-gray-800">
                                         
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


                        
                        <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
                          <div className="bg-white p-6 rounded-lg shadow-md w-100 ">
                            <h2 className="text-2xl font-bold mb-4">Developer Registration</h2>
                            {message && <p className="text-green-500">{message}</p>}
                            <form onSubmit={handleSubmit}>
                              <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full mb-3 p-2 border rounded"
                                required
                              />
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full mb-3 p-2 border rounded"
                                required
                              />
                              <input
                                type="text"
                                name="skills"
                                placeholder="Skills (e.g., JavaScript, React)"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full mb-3 p-2 border rounded"
                                required
                              />
                              <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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
