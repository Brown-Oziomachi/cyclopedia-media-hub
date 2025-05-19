import React, { useState } from "react";


  export default function BottomNav() {


    return (
      <div className="fixed bottom-0 left-0 w-full bg-black text-white py-3 shadow-lg">
      <div className="flex justify-start items-center md:animate-none overflow-x-auto max-md:whitespace-nowrap snap-x snap-mandatory">
        <button className="snap-start shrink-0 p-2 rounded   whitespace-nowrap">
        Welcome to webwiz Creation, a website development company. We are a team
        of skilled developers and designers dedicated to creating high-quality
        websites that meet your needs. Our goal is to help you establish a
        strong online presence and achieve your business objectives through
        effective web solutions. Whether you need a simple website or a complex
        web application, we have the expertise to deliver exceptional results.
        Contact us today to learn more about our services and how we can help
        you succeed online.
        </button>
        <button className="snap-start shrink-0 p-2  rounded max-md:whitespace-normal">
        We offer a wide range of services, including website design, web
        development, e-commerce solutions, and search engine optimization. Our
        team is proficient in the latest web technologies and design trends,
        ensuring that your website is not only visually appealing but also
        functional and user-friendly. We work closely with our clients to
        understand their specific requirements and create customized solutions
        that align with their brand identity and business goals.
        </button>
        <button className="snap-start shrink-0 p-2 rounded max-md:whitespace-normal">
        At webwiz Creation, we are committed to delivering exceptional customer
        service and building long-term relationships with our clients. We believe
        in open communication, transparency, and collaboration throughout the
        entire project lifecycle. Our dedicated project managers ensure that your
        project is completed on time and within budget. We also provide ongoing
        support and maintenance services to keep your website running smoothly and
        securely.
        </button>
      </div>
      </div>
    );
  }