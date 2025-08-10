"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, LogIn,  ChevronRight, ChevronsDownUp, 
 } from "lucide-react";
import { Drawer, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useRuter } from "next/router";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import { useRouter } from "next/navigation";



const ProfileDropdownNavbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query}`);
    }
  };

  const searchParams = useSearchParams();
  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 200); // small delay to ensure DOM is ready
      }
    }
  }, [searchParams]);


  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: "Home", url: "/" },
    { text: "News", url: "/#News-cpd" },
    { text: "About", url: "/about" },
    { text: "Contact", url: "/contact" },
 
  ];

 return (
   <main className="max-md:fixed z-50 top-0 left-0 w-full bg-black text-white shadow-lg overflow-x-hidden">
     <div>
       <p className="text-xs text-center bg-white text-black ">
         INFORMATION IS FREEDOM
       </p>
       <div className="relative inline-block text-left z-50 max-md:hidden">
         <div>
           <button
             onClick={() => setOpen(!open)}
             className="inline-flex justify-between items-center w-44 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
           >
             Regions
             <ChevronDown className="ml-10 h-4 w-4 text-gray-500" />
           </button>
         </div>

         {open && (
           <div
             className=" right-0 left-0 z-30 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto fixed"
             style={{ maxHeight: "250px" }}
           >
             <div className="py-1">
               <Link
                 href="/africa"
                 className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                 onClick={() => setOpen(false)}
               >
                 🌍 Africa
               </Link>
               <Link
                 href="/asia"
                 className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                 onClick={() => setOpen(false)}
               >
                 🌏 Asia
               </Link>
               <Link
                 href="/america"
                 className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                 onClick={() => setOpen(false)}
               >
                 🌎 America
               </Link>
               <Link
                 href="/europe"
                 className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                 onClick={() => setOpen(false)}
               >
                 🌍 Europe
               </Link>
               <Link
                 href="/middle-east"
                 className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                 onClick={() => setOpen(false)}
               >
                 🕌 Middle East
               </Link>
               <Link
                 href="/oceania"
                 className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                 onClick={() => setOpen(false)}
               >
                 🌊 Oceania
               </Link>
               <Link
                 href="/global"
                 className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                 onClick={() => setOpen(false)}
               >
                 🌐 Global
               </Link>
             </div>
           </div>
         )}
       </div>
     </div>

     <section className="px-5 py-4 flex items-center justify-between z-50 mb-0 -mt-3">
       {" "}
       <Link href="/">
         {" "}
         <Image
           src="/hid.png"
           alt="Logo"
           width={40}
           height={40}
           className="rounded-full border-3 border-purple-500 "
         />{" "}
       </Link>
       <h1
        
         className="font-playfair lg:mr-auto text-4xl lg:text-6xl mb-2 font-bold bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text tracking-wide z-50"
       >
         Cyclopedia
       </h1>
       <div className="hidden items-center gap-5 lg:hidden">
         {navItems.map((item, index) => (
           <Link
             key={index}
             href={item.url}
             className="text-sm uppercase tracking-wide text-gray-300 hover:text-cyan-400 font-medium transition duration-200"
           >
             {item.text}
           </Link>
         ))}
       </div>
       
       <div className="hidden lg:flex items-center gap-4">
         {session ? (
           <>
             <button
               onClick={toggleDrawer(true)}
               className="flex items-center gap-2"
             >
               <div className="relative">
                 <img
                   src={session?.user?.image || "/default-avatar.png"}
                   alt={session?.user?.name}
                   width={36}
                   height={36}
                   className="rounded-full border border-gray-600 shadow hover:shadow-lg transition duration-300 object-cover"
                 />
                 <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-gray-900"></span>
               </div>
               <span className="text-sm font-semibold text-gray-200">
                 {session?.user?.name}
               </span>
               <ChevronDown className="text-xl text-cyan-400" />
             </button>

             <Drawer
               anchor="right"
               open={drawerOpen}
               onClose={toggleDrawer(false)}
             >
               <Box
                 sx={{
                   width: 350,
                   bgcolor: "black",
                   height: "100%",
                   p: 3,
                   display: "flex",
                   flexDirection: "column",
                   justifyContent: "space-between",
                 }}
                 onClick={toggleDrawer(false)}
                 onKeyDown={toggleDrawer(false)}
               >
                 <div>
                   <h1 className="text-green-600 text-center text-2xl font-serif font-bold">
                     Hello!!
                   </h1>
                   <p className="font-semibold text-base text-white text-center">
                     {session.user.name}
                   </p>
                   <p className="text-gray-400 text-xs text-center mb-4">
                     {session.user.email}
                   </p>

                   <hr className="my-4 border-gray-600" />

                   <nav className="flex flex-col space-y-2 text-gray-300 text-sm">
                     <Link
                       href="/blog?genre=news"
                       className="hover:text-cyan-400"
                     >
                       News
                     </Link>
                     <Link href="/news" className="hover:text-cyan-400">
                       Notifications
                     </Link>
                     <h1
                       className="font-bold font-serif cursor-pointer text-green-700 text-center mt-5"
                       onClick={() => {
                         const el = document.getElementById("services-section");
                         if (el) el.scrollIntoView({ behavior: "smooth" });
                       }}
                     >
                       Have something to Share? ⬇
                       <img src="/share.jpg" alt="Share" className="mt-5" />
                     </h1>
                   </nav>
                 </div>

                 <button
                   onClick={signOut}
                   className="mt-6 w-full py-2 rounded bg-gradient-to-r bg-purple-500 to-cyan-500 text-white text-sm font-semibold hover:opacity-90"
                 >
                   Sign Out
                 </button>
               </Box>
             </Drawer>
           </>
         ) : (
           <Link
             href="/auth/signin"
             className="text-sm py-2 px-4 bg-gradient-to-r bg-purple-500 to-cyan-500 text-white rounded-lg hover:bg-cyan-500 transition"
           >
             Sign In <LogIn className="inline-block ml-5" size={16} />
           </Link>
         )}
       </div>
       <div className="flex items-center lg:hidden gap-3 ">
         {session && (
           <button
             onClick={toggleDrawer(true)}
             className="bg-white rounded-full"
           >
             <img
               src={session.user.image || "/default-avatar.png"}
               alt={session.user.name}
               width={36}
               height={36}
               className="rounded-full border border-gray-500 object-cover"
             />
           </button>
         )}

         <button
           onClick={() => setShowNav(!showNav)}
           className="text-3xl text-orange-400"
           aria-label="Toggle navigation menu"
         >
           {showNav ? (
             <ChevronsDownUp className="text-purple-600" />
           ) : (
             <ChevronDown className="text-white" />
           )}
         </button>
       </div>
     </section>

     {/* Mobile Navigation */}
     {showNav && (
       <div
         className="fixed inset-0 bg-white bg-opacity-95 flex flex-col text-black p-5 z-[100] mt-20 transition-all duration-500 overflow-x-auto whitespace-nowrap"
         style={{ top: 0, left: 0 }}
       >
         {/* <button
            className="absolute top-6 right-6 text-3xl text-gray-300 hover:text-cyan-400"
            onClick={() => setShowNav(false)}
            aria-label="Close navigation menu"
          >
            <ListCollapse />
          </button> */}
         <form onSubmit={handleSearch} className="flex gap-2">
           <input
             type="text"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Search tags like politics, cylopedia..."
             className="px-2 py-1 rounded text-black bg-purple-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full"
           />
           <button
             type="submit"
             className="bg-purple-500 px-4 py-1 rounded"
             onClick={() => setShowNav(false)}
           >
             Search
           </button>
         </form>

         <div>
           <ul className="space-y-2 text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
             <li>
               <Link href="/politics" onClick={() => setShowNav(false)}>
                 Politics
               </Link>
             </li>
             <li>
               <Link href="/religion" onClick={() => setShowNav(false)}>
                 Religion
               </Link>
             </li>
             <li>
               <Link href="/history" onClick={() => setShowNav(false)}>
                 History
               </Link>
             </li>
           </ul>
         </div>

         <Link
           href="/#read-more"
           onClick={() => {
             setShowNav(false);
             setShowDropdown(false);
           }}
           className="shadow-black w-1/2 shadow-xl cursor-pointer text-2xl border border-cyan-400 rounded-3xl bg-purple-600 text-white lg:text-center font-semibold font-serif mt-5"
         >
           <div className="flex items-center justify-center text-purple-300">
             <ChevronRight />
             <p className="text-xs font-extralight">Explore more</p>
           </div>
         </Link>
         <hr className="my-4 border-gray-600" />
         <Link href="/newsletter">
           <h1
             className=" text-gray-400 text-sm mb-4"
             onClick={() => setShowNav(false)}
           >
             Newsletter
           </h1>
         </Link>
         <hr className="my-4 border-gray-600" />
         <div>
           <Link href="/africa">
             <h1
               className="text-gray-400 text-sm mb-4"
               onClick={() => setShowNav(false)}
             >
               Africa
             </h1>
           </Link>
           <Link href="/america">
             <h2
               className="text-gray-400 text-sm mb-4"
               onClick={() => setShowNav(false)}
             >
               America
             </h2>
           </Link>
           <Link href="/asia">
             <h3
               className="text-gray-400 text-sm mb-4"
               onClick={() => setShowNav(false)}
             >
               Asia
             </h3>
           </Link>
           <Link href="/europe">
             <h4
               className="text-gray-400 text-sm mb-4"
               onClick={() => setShowNav(false)}
             >
               Europe
             </h4>
           </Link>
           <Link href="/oceania">
             <h5
               className="text-gray-400 text-sm mb-4"
               onClick={() => setShowNav(false)}
             >
               Oceania
             </h5>
           </Link>
           <Link href="/antarctica">
             <h6
               className="text-gray-400 text-sm mb-4"
               onClick={() => setShowNav(false)}
             >
               Antarctica
             </h6>
           </Link>
         </div>
         <nav className="flex flex-col gap-6 mt-8">
           {navItems.map((item, index) => (
             <Link
               key={index}
               href={item.url}
               onClick={() => setShowNav(false)}
               className="text-sm font-semibold hover:text-cyan-400 transition duration-200"
             >
               {item.text}
             </Link>
           ))}
         </nav>
         <div></div>
         <div className="mt-10 w-full gap-5 flex-col  mx-auto flex items-center">
           {session ? (
             <button
               onClick={() => {
                 signOut();
                 setShowNav(false);
               }}
               className="py-3 w-3/4 rounded-lg bg-gradient-to-r bg-purple-500 to-cyan-500 hover:bg-cyan-500 text-white font-medium"
             >
               Sign Out
             </button>
           ) : (
             <Link
               href="/contact"
               onClick={() => setShowNav(false)}
               className="py-3 w-3/4 rounded-lg bg-gradient-to-r bg-purple-500 to-cyan-500 hover:bg-cyan-500 text-white font-medium text-center"
             >
               Join Us
             </Link>
           )}

           <Link
             href="/auth/signin"
             onClick={() => setShowNav(false)}
             className="py-3 w-3/4 rounded-lg bg-gradient-to-r bg-purple-500 to-cyan-500 hover:bg-cyan-500 text-white font-medium text-center"
           >
             Signin
           </Link>
         </div>
       </div>
     )}
   </main>
 );
};

export default ProfileDropdownNavbar;
