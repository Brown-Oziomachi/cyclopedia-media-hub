import React from "react";
import SupportCard from "@/components/SupportCard";  
import ScrollProgressBar from "@/components/ScrollProgressBar";
const SomePage = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <SupportCard />
        <ScrollProgressBar />
      </div>
    );
  };
  
  export default SomePage;