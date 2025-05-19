import { MessageCircle } from "lucide-react";
import { useState } from "react";

const ChatDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-50 max-md:bottom-40 right-2 z-50">
      <button
        className="bg-white text-black py-2 rounded-md flex items-center shadow-md p-2 z-0"
        onClick={() => setIsOpen(!isOpen)}
      >
          <MessageCircle /> <span className="ml-2">&#9662;</span> {/* Down arrow */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black shadow-lg rounded-md border">
          <ul className="flex flex-col">
            <li>
              <a
                href="https://wa.me/message/R4UKUMFIH22RJ1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 hover:bg-black text-white"
              >
                <img src="/whatsapp logo.png" alt="WhatsApp" className="w-10 h-10 max-md:w-5 max-md:h-5 mr-2" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/webwiz_creation_webdevelopers/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 hover:bg-black text-white" 
              >
                <img src="/instagram.png" alt="Instagram" className="w-10 h-10 max-md:w-5 max-md:h-5 mr-2" />
                Instagram
              </a>
            </li>
            <li>
              <a
                href="http://www.linkedin.com/in/brownoziomachi72a5a3229"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 hover:bg-black text-white"
              >
                <img src="/linkedin.png" alt="LinkedIn" className="w-10 h-10 max-md:w-5 max-md:h-5 mr-2 " />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatDropdown;
