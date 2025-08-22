"use client";
import { SpeedDial, SpeedDialIcon } from "@mui/material";
import {
  MessageCircle,
  Instagram,
  Linkedin,
  MessageSquareText,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      name: "WhatsApp",
      icon: <MessageSquareText className="w-5 h-5 mr-2 text-green-400" />,
      href: "https://wa.me/message/R4UKUMFIH22RJ1",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5 mr-2 text-pink-400" />,
      href: "https://www.instagram.com/webwiz_creation_webdevelopers/",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5 mr-2 text-blue-400" />,
      href: "http://www.linkedin.com/in/brownoziomachi72a5a3229",
    },
  ];

  return (
    <>
      {/* SpeedDial Button */}
      <div className="fixed bottom-16 right-4 z-50">
        <SpeedDial
          ariaLabel="Chat options"
          sx={{ position: "absolute", bottom: 0, right: 0 }}
          icon={<SpeedDialIcon openIcon={<MessageCircle />} />}
          onClick={() => setIsOpen(!isOpen)}
          FabProps={{
            sx: {
              backgroundColor: "#6b21a8",
              color: "white",
              "&:hover": { backgroundColor: "#9333ea" },
            },
          }}
        />
      </div>

      {/* Chat Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-6 z-50 w-72 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700 overflow-hidden"
          >
            <ul className="flex flex-col divide-y divide-gray-700">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-5 py-4 hover:bg-gray-800 transition"
                  >
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatDropdown;
