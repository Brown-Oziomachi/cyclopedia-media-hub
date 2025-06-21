"use client";
import { SpeedDial, SpeedDialIcon } from "@mui/material";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

const ChatDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* SpeedDial Button */}
      <div className="fixed bottom-16 right-4 z-50">
        <SpeedDial
          ariaLabel="Chat options"
          sx={{ position: "absolute", bottom: 0, right: 0 }}
          icon={<SpeedDialIcon />}
          onClick={() => setIsOpen(!isOpen)}
          FabProps={{ sx: { backgroundColor: "#fff", color: "#000" } }}
        />
      </div>

      {/* Chat Dropdown Menu */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 z-50 w-60 bg-gray-400/5 text-white rounded-md shadow-xl border border-gray-600">
          <ul className="flex flex-col">
            <li>
              <a
                href="https://wa.me/message/R4UKUMFIH22RJ1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 hover:bg-gray-800"
              >
                <img
                  src="/whatsapp logo.png"
                  alt="WhatsApp"
                  className="w-8 h-8 mr-3"
                />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/webwiz_creation_webdevelopers/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 hover:bg-gray-800"
              >
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="w-8 h-8 mr-3"
                />
                Instagram
              </a>
            </li>
            <li>
              <a
                href="http://www.linkedin.com/in/brownoziomachi72a5a3229"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 hover:bg-gray-800"
              >
                <img
                  src="/linkedin.png"
                  alt="LinkedIn"
                  className="w-8 h-8 mr-3"
                />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ChatDropdown;
