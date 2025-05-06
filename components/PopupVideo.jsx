import { Play } from "lucide-react";
import { useState } from "react";

export default function PopupVideo() {
  const [isOpen, setIsOpen] = useState(false);

return (
    <div className="flex flex-col items-center justify-center mt-5">
        {/* Watch Button */}
        <button
            onClick={() => setIsOpen(true)}
            className="group  flex gap-1 bg-gradient-to-r from-gray-900 via-black to-orange-400 text-white px-10 py-3 rounded-lg hover:bg-blue-600 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
            <Play className="group-hover:bg-red-800"/>
            Watch Video
        </button>

        {/* Popup Video */}
        {isOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-full h-full">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-4 text-black text-xl"
                    >
                        &times;
                    </button>
                    <video className="w-full h-full rounded-md bg-gradient-to-r from-gray-900 via-black to-orange-400 transform-transition" controls autoPlay>
                        <source src="/webwiz video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                     <button
                        onClick={() => setIsOpen(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-4 absolute bottom-2 right-4  duration-300 ease-in-out hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}
    </div>
);
}
