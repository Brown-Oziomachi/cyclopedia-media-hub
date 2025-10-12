// import { useState } from "react";
// import { Search, X } from "lucide-react";

// export default function SearchPopup() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = () => {
//     if (!searchQuery.trim()) return;

//     console.log("Searching for:", searchQuery);

//     setIsOpen(false);
//     setSearchQuery("");
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     setSearchQuery("");
//   };

//   return (
//     <div>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="bg-purple-600 hover:bg-purple-700  text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:ring-4 focus:ring-purple-400 focus:outline-none"
//         aria-label="Open search"
//       >
//         <Search size={10} />
//       </button>

//       {isOpen && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
//             onClick={handleClose}
//           />

//           <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
//             <div
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative pointer-events-auto transform animate-scale-in"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={handleClose}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
//                 aria-label="Close search"
//               >
//                 <X size={24} />
//               </button>

//               <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 ">
//                 Search in <span className="text-purple-600">Cyclopedia</span>
//               </h2>

//               <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:ring-4 focus-within:ring-purple-300 focus-within:border-purple-500 transition-all">
//                 <Search size={20} className="ml-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Type to search articles, authors, or topics..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                   className="w-full px-4 py-3 text-gray-800 focus:outline-none bg-transparent"
//                   autoFocus
//                 />
//                 <button
//                   onClick={handleSearch}
//                   disabled={!searchQuery.trim()}
//                   className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed px-6 py-3 text-white transition-colors font-medium"
//                 >
//                   Search
//                 </button>
//               </div>

//               <div className="mt-6 text-center text-sm text-gray-500">
//                 <p>
//                   Press{" "}
//                   <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 text-xs">
//                     Enter
//                   </kbd>{" "}
//                   to search
//                 </p>
//               </div>

//               <div className="mt-6">
//                 <p className="text-xs text-gray-400 mb-2">Popular searches:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {["React", "JavaScript", "CSS", "Next.js"].map((tag) => (
//                     <button
//                       key={tag}
//                       onClick={() => {
//                         setSearchQuery(tag);
//                         setTimeout(handleSearch, 100);
//                       }}
//                       className="px-3 py-1 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-full text-xs transition-colors"
//                     >
//                       {tag}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         @keyframes scale-in {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 0.2s ease-out;
//         }

//         .animate-scale-in {
//           animation: scale-in 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }
