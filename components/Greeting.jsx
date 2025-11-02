"use client";
import React, { useEffect, useState } from "react";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
      setGreeting("Good morning");
    } else if (hours < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <h2 className="text-sm font-semibold text-gray-800 dark:text-white max-md:-mt-15 flex gap-2 items-center">
      {greeting} <a href="/pp-feedbacks" className="text-blue-700"><p>Subscriber</p></a> 
    </h2>
  );
};

export default Greeting;
