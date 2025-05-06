import { useState } from "react";

const ChatDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-50 max-md:bottom-40 right-2 z-50">
      <button
        className="bg-green-500 text-white py-2 rounded-md flex items-center shadow-md hover:bg-green-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        Chat Us <span className="ml-2">&#9662;</span> {/* Down arrow */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black shadow-lg rounded-md border">
          <ul className="flex flex-col">
            <li>
              <a
                href="https://wa.me/message/R4UKUMFIH22RJ1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 hover:bg-black"
              >
                <img src="/whatsapp.png" alt="WhatsApp" className="w-10 h-10 max-md:w-5 max-md:h-5 mr-2" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/webwiz_creation_webdevelopers/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 hover:bg-black"
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
                className="flex items-center p-3 hover:bg-black"
              >
                <img src="/linkedin.png" alt="LinkedIn" className="w-10 h-10 max-md:w-5 max-md:h-5 mr-2" />
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
