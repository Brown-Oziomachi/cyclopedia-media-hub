// SupportCard.jsx
"use client";
import React, { useState } from "react";
import Link from "next/link";

const SupportCard = () => {
  const [showBankInfo, setShowBankInfo] = useState(false);

  const handleBankClick = (e) => {
    e.preventDefault();
    setShowBankInfo(true);
  };

  const closeModal = () => {
    setShowBankInfo(false);
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-900 shadow-md rounded-lg overflow-hidden relative">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">
          Support WebWiz Creation
        </h2>
        <p className="text-gray-200 mb-6 text-center">
          Contribute to our project via PayPal or bank transfer.
        </p>
        <div className="flex justify-around">
          {/* PayPal Link */}
          <Link href="https://www.paypal.com/paypalme/yourusername" passHref>
            <p
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
            >
              {/* PayPal Icon (Placeholder) */}
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.372 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12C24 5.372 18.628 0 12 0zM10 17v-2h4v2h-4zm0-4v-6h4v6h-4z" />
              </svg>
              PayPal
            </p>
          </Link>
          {/* Bank Button — triggers modal */}
          <button
            onClick={handleBankClick}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
          >
            {/* Bank Icon (Placeholder) */}
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 6.18L5.5 7.24 12 4l6.5 3.24L12 8.18zM6 12v7h3v-4h6v4h3v-7l-7-3.18L6 12z" />
            </svg>
            Bank
          </button>
        </div>
      </div>
      
      {/* Bank Info Modal */}
      {showBankInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
            <h3 className="text-xl font-semibold mb-4">Bank Details</h3>
            <p className="text-gray-700 mb-2">
              <strong>Bank Name:</strong> Example Bank
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Account Name:</strong> WebWiz Creations Ltd.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Account Number:</strong> 1234567890
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Routing Number:</strong> 987654321
            </p>
            <p className="text-gray-700">
              Please use the above details when making a bank transfer.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportCard;
